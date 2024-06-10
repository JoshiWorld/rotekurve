/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SocialLinks } from "@prisma/client";
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

export function EditKontakts({ link }: { link: SocialLinks }) {
  const router = useRouter();

  // Init Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: link.title,
      href: link.href,
    },
  });

  const editLink = api.contact.updateSocial.useMutation({
    onSuccess: () => {
      router.push("/internal/kontakt");
      toast("Die Bearbeitung war erfolgreich.", {
        description: "ID: " + link.id,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = link.id;
    const { title, href } = values;
    editLink.mutate({ id, title, href });
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
