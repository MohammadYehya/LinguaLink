"use client";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const { roomId } = useParams();
  const { socket, roomUsers } = useSocket();
  const { username } = useUser();

  useEffect(() => {
    if (roomUsers[roomId as string]?.includes(socket?.id)) return;
    socket?.emit("send_message", {
      text: username + " joined the room.",
      socketId: "kurakani",
      roomId: roomId,
    });
    socket?.emit("join_room", roomId);
  }, []);

  return (
    <div className="flex relative flex-col w-full h-screen">
      <ChatHeader roomId={roomId as string} />
      <ChatBody roomId={roomId as string} />
      <ChatFooter roomId={roomId as string} />
    </div>
  );
}

export default Page;