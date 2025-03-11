"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { api } from "@/trpc/react";
import { toast } from "sonner";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { type Impressum } from "@prisma/client";
import { CreateImpressum } from "./create-impressum";

const formSchema = z.object({
  content: z.string().min(1),
});

export function EditImpressum({ aboutus }: { aboutus: Impressum }) {
  const router = useRouter();

  // Init Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      content: aboutus.content,
    },
  });

  const editAboutus = api.impressum.update.useMutation({
    onSuccess: () => {
      router.push("/internal");
      toast("Die Bearbeitung war erfolgreich.", {
        description: "Impressum wurde geändert.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const id = aboutus.id;
    const { content } = values;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    editAboutus.mutate({ id, content });
  }

  if (!aboutus) return <CreateImpressum />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
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
              <FormDescription>Impressum Inhalt bearbeiten</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={editAboutus.isPending}>
          {editAboutus.isPending ? "Wird gespeichert..." : "Speichern"}
        </Button>
      </form>
    </Form>
  );
}
