/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectSeparator } from "@/components/ui/select";
import { type SocialLinks } from "@prisma/client";
import { FacebookIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from "@/components/social-icons";


function ContactLinks() {
  const [links, setLinks] = useState<SocialLinks[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = api.contact.getSocials.useQuery();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (data) setLinks(data);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-5 text-center">
      <h1 className="mb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Unser Social-Media
      </h1>
      {isLoading ? (
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ) : (
        <div className="flex space-x-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="pt-2 text-xl font-semibold tracking-tight"
              aria-label={link.title}
            >
              {link.title.toLowerCase() === "twitter" && <TwitterIcon />}
              {link.title.toLowerCase() === "instagram" && <InstagramIcon />}
              {link.title.toLowerCase() === "youtube" && <YouTubeIcon />}
              {link.title.toLowerCase() === "facebook" && <FacebookIcon />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}


export default function Contact() {
  const router = useRouter();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const sendMail = api.contact.send.useMutation({
    onSuccess: () => {
      router.push('/contact/sent');
      setFirstname('');
      setLastname("");
      setEmail("");
      setContent("");
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ firstname, lastname, email, content });
    sendMail.mutate({firstname, lastname, email, content});
  };

  return (
    <div>
      <ContactLinks />
      <SelectSeparator />
      <div className="mx-auto mt-10 w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Kontaktformular
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Du hast ein Anliegen? Dann trete mit uns in Kontakt.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="firstname">Vorname</Label>
              <Input
                id="firstname"
                placeholder="Max"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Nachname</Label>
              <Input
                id="lastname"
                placeholder="Mustermann"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              placeholder="maxmustermann@mail.de"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="content">Anliegen</Label>
            <Textarea
              id="content"
              placeholder="Beschreibe dein Anliegen.."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </LabelInputContainer>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={sendMail.isPending}
          >
            {sendMail.isPending ? "Wird gesendet.." : "Senden"}&rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
