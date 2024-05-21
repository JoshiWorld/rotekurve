"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/ace-tabs";
import { InternalDashboard } from "./internal-dashboard";

export function InternalTabs() {
  const tabs = [
    {
      title: "Start",
      value: "start",
      content: (
        <div className="overflow-y-scroll relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-red-900 p-10 text-xl font-bold text-white md:text-4xl">
          <InternalDashboard />
        </div>
      ),
    },
    {
      title: "User",
      value: "user",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-red-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>User</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Rechtliches",
      value: "rechtliches",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background to-red-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Rechtliches</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] md:h-[40rem] mb-96">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="https://rotekurve.s3.eu-north-1.amazonaws.com/posts/1714039369194-308er-AUFTRITT.jpg"
      alt="dummy image"
      width="1000"
      height="1000"
      className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top md:h-[90%]"
    />
  );
};
