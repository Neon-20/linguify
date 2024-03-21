"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center flex h-screen justify-center">
      <Button
        variant="default"
        size="default"
        className="bg-blue-500 font-mono"
      >
        Click me please
      </Button>
    </div>
  );
}
