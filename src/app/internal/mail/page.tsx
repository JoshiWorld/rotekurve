"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MailRedirect() {
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const newTab = window.open("https://rotekurve.awsapps.com/mail", "_blank");
    if (newTab) {
      newTab.focus();
      router.replace("/internal");
    } else {
      // Fallback if the popup was blocked
      window.location.href = "https://rotekurve.awsapps.com/mail";
    }
  }, [router]);

  return null;
}
