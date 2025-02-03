'use client'
import Chat from "@/components/Chat";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/socket"); // Initialize the WebSocket server
  }, []);
  return (
    <Chat />
  );
}
