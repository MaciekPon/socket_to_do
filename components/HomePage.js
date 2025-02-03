"use client";
import Chat from "@/components/Chat";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    fetch("/api/socket");
  }, []);

  return <Chat />;
}
