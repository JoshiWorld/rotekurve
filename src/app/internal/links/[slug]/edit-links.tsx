"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Link } from "@prisma/client";
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
import { api } from "@/trpc/react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
});

export function EditLinks({ link }: { link: Link }) {
  const router = useRouter();

  // Init Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: link.title,
      description: link.description,
      href: link.href,
    },
  });

  const editLink = api.link.update.useMutation({
    onSuccess: () => {
      router.push("/internal/links");
      toast("Die Bearbeitung war erfolgreich.", {
        description: "ID: " + link.id,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = link.id;
    const { title, description, href } = values;
    editLink.mutate({ id, title, description, href });
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
                <FormDescription>Titel des Links bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschreibung</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Beschreibung" {...field} />
                </FormControl>
                <FormDescription>
                  Beschreibung des Links bearbeiten
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Link" {...field} />
                </FormControl>
                <FormDescription>
                  Pfad des Links bearbeiten
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={editLink.isPending}>
            {editLink.isPending ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
