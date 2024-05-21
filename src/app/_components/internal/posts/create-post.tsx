"use client";

import dynamic from "next/dynamic";
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

// Dynamic import for ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      setTitle("");
      setContent("");
      setFile(null);
      toast("Der Post wurde erstellt.", {
        description: "Titel: " + title,
      });
    },
  });

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/posts/upload", {
        method: "POST",
        body: formData,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const fileSrc: string = data.fileName;
      createPost.mutate({ title, content, fileSrc });
    } catch (error) {
      console.error(error);
    }
  };

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-expect-error || its okay that there is an error
    setFile(e.currentTarget.files?.[0]);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
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
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Titel-Bild
            </Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              className="col-span-2"
              onChange={onFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={createPost.isPending}
          >
            {createPost.isPending ? "Wird erstellt..." : "Erstellen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
