"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { SparklesCore } from "@/components/ui/sparkles";

export function AktuellesHeadLamp() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-red-400 to-primary bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Hannover 96 <br /> Rotekurve
      </motion.h1>
    </LampContainer>
  );
}

export function AktuellesHeadSparkles() {
  return (
    <div className="relative z-0 flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0 h-screen w-full">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url('https://rotekurve.s3.eu-north-1.amazonaws.com/posts/1714039369194-308er-AUFTRITT.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundOrigin: "revert",
          }}
        >
          <SparklesCore
            id="tsparticlesfullpage"
            minSize={0.6}
            maxSize={1.4}
            background="transparent"
            particleDensity={100}
            particleColor="#F98080"
          />
        </div>
      </div>
      <h1 className="relative z-20 text-center text-3xl font-bold uppercase text-white md:text-7xl lg:text-6xl">
        Rotekurve
      </h1>
    </div>
  );
}