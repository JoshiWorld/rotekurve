"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Log, type Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LogView } from "./logs";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  archieved: z.boolean(),
});

// export function EditPostForm({ post, logs }: { post: Post, logs: Log[] }) {
export function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();

  // Init Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      archieved: post.archieved,
    },
  });

  const editPost = api.post.update.useMutation({
    onSuccess: () => {
      router.push('/internal/posts');
      toast("Die Bearbeitung war erfolgreich.", {
        description: "ID: " + post.id,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = post.id;
    const { title, content, archieved } = values;
    editPost.mutate({ id, title, content, archieved });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Titel" {...field} />
                </FormControl>
                <FormDescription>Titel des Posts bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhalt</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                  />
                </FormControl>
                <FormDescription>Inhalt des Posts bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="archieved"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormLabel>Archiviert</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Soll dieser Post archiviert werden?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={editPost.isPending}>
            {editPost.isPending ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </form>
      </Form>

      {/* {logs.map((log, index) => (
        <div className="mt-8" key={index}>
          <LogView log={log} />
        </div>
      ))} */}
    </div>
  );
}
