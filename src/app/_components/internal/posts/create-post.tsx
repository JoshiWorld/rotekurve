"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      setTitle("");
      setContent("");
      setImage("");
      toast("Der Post wurde erstellt.", {
          description: "Titel: " + title
      });
    }
  });

  return (
    <Dialog onOpenChange={(e) => setOpen(e)} open={open}>
      <DialogTrigger asChild>
        <Button variant="default">Erstellen</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Blog-Post erstellen</DialogTitle>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Inhalt
            </Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Titel-Bild
            </Label>
            <Input type="file" id="image" className="col-span-2" />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              createPost.mutate({ title, content, image });
            }}
            disabled={createPost.isPending}
          >
            {createPost.isPending ? "Wird erstellt..." : "Erstellen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
