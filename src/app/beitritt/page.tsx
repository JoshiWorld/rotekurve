"use client";

import * as React from "react";
import { useEffect } from "react";

export default function Beitritt() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href =
      "https://rotekurve.s3.eu-north-1.amazonaws.com/Beitrittserkl%C3%A4rung_2024.pdf";
    link.download = "Beitrittserklärung_2024.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-5">
      Beitrittserklärung öffnen..
    </div>
  );
}
