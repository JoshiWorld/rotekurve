"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function CreateKontakt() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [href, setHref] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const createSocial = api.contact.createSocial.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
      setHref("");
      setOpen(false);
      toast("Der Social-Link wurde erstellt.", {
        description: "Titel: " + title,
      });
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="default">Erstellen</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Social-Media-Link erstellen</DialogTitle>
          <DialogDescription>Test</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Titel
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="href" className="text-right">
              Link
            </Label>
            <Input
              id="href"
              type="text"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => createSocial.mutate({ title, href })}
            disabled={createSocial.isPending}
          >
            {createSocial.isPending ? "Wird erstellt..." : "Erstellen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
