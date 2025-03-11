"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ContactSent() {
    const router = useRouter();

    return (
      <div className="container mt-10 flex flex-col items-center justify-center text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Wir haben dein Anliegen erhalten.
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Du wirst in Kürze von uns hören!
        </p>
        <Button className="mt-5" onClick={() => router.push("/aktuelles")}>
          Zurück zur Startseite
        </Button>
      </div>
    );
}