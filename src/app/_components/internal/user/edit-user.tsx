"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(1),
  name: z.string().min(1),
  email: z.string().min(1),
  role: z.string().min(1),
});

export function EditUserForm({ user }: { user: User }) {
  const router = useRouter();

  // Init Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name ?? "",
      email: user.email ?? "",
      role: user.role,
    },
  });

  const editUser = api.user.update.useMutation({
    onSuccess: () => {
      router.push("/internal/user");
      toast("Die Bearbeitung war erfolgreich.", {
        description: "ID: " + user.id,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = user.id;
    const { username, name, email, role } = values;
    const validRole = role as "USER" | "ADMIN"; // Ensure role is of type "USER" or "ADMIN"
    editUser.mutate({ id, username, name, email, role: validRole });
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>Name des Users bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="E-Mail" {...field} />
                </FormControl>
                <FormDescription>E-Mail des Users bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>Username des Users bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rolle</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={user.role}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Rolle auswählen" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Rollen</SelectLabel>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Rolle des Users bearbeiten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={editUser.isPending}>
            {editUser.isPending ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
