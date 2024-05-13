"use client";
import { useSocket } from "@/contexts/SocketContext";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import ChatImage from "./ChatImage";
import ChatAudio from "./ChatAudio";

function ChatBody({ roomId }: { roomId: string }) {
  const [typing, setTyping] = useState<string>("");
  const [msgLoading, setMsgLoading] = useState(false);
  const [translate, setTranslate] = useState(false);
  const [translateshow, setTranslateshow] = useState(-1);
  const [translatemsg, setTranslatemsg] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { messages, socket } = useSocket();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket?.on("typing_response", (data) => {
      setTyping(data);
    });
  }, []);

  useEffect(() => {
    if (translate == true)
    {
      setTranslate(false)
      setMsgLoading(true)
      fetch('http://localhost:8000/predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'sentence' : translatemsg.toLocaleLowerCase()})
      })
      .then((res) => res.json())
      .then((data) => {console.log(data); messages[roomId][translateshow].translatedText = data})
      .then(() => setMsgLoading(false))
    }
  }, [translate])

  return (
    <div className="basis-[85%] overflow-y-scroll p-5 w-full flex flex-col gap-2">
      {messages[roomId]?.map((message: any, index: number) =>
        message.socketId === "kurakani" ? (
          <div className="flex self-center" key={index}>
            <div className="flex justify-center items-center">
              <p>{message.text}</p>
            </div>
          </div>
        ) : message.socketId === socket?.id ? (
          <div className="flex self-end flex-col items-end" key={index}>
            {message.text && <div className="flex justify-center items-center px-3 py-1 text-white rounded-full rounded-br-none bg-purple-600" onPointerOver={() => {setTranslateshow(index); setTranslatemsg(message.text)}} onPointerLeave={() => setTranslateshow(-1)}>
              <p className="font-sans">{message.text}</p>
            </div>}
            {message.image && <ChatImage imgURL={message.image} />}
            {message.audio && <ChatAudio audURL={message.audio} />}
            {translateshow == index && <div className="flex w-40 h-8 bg-slate-200 rounded-full justify-center items-center cursor-pointer hover:font-bold" onPointerOver={() => {setTranslateshow(index)}} onPointerLeave={() => setTranslateshow(-1)} key = {index} onClick={() => {setTranslate(true)}}>{msgLoading ? "Translating..." : message.translatedText ?  message.translatedText : "Translate to French"}</div>}
          </div>
        ) : (
          <div className="flex gap-2 self-start" key={index}>
            <div className="self-center">
              <Avatar 
                name={message.name}
                round={true}
                size="30"
                className="text-sm"
              />
            </div>
            <div>
              <p className="pl-2 text-sm align-bottom">{message.name}</p>
              {message.text && <div className={`px-3 py-1 bg-gray-200 rounded-full ${message.image ? "rounded-bl-none" : "rounded-tl-none"} w-fit`} onPointerOver={() => {setTranslateshow(index); setTranslatemsg(message.text)}} onPointerLeave={() => setTranslateshow(-1)}>
                <p className="font-sans">{message.text}</p>
              </div>}
              {message.image && <ChatImage imgURL={message.image} />}
              {message.audio && <ChatAudio audURL={message.audio} />}
              {translateshow == index && <div className="flex w-40 h-8 bg-slate-200 rounded-full justify-center items-center cursor-pointer hover:font-bold" onPointerOver={() => {setTranslateshow(index)}} onPointerLeave={() => setTranslateshow(-1)} key = {index} onClick={() => {setTranslate(true)}}>{msgLoading ? "Translating..." : message.translatedText ?  message.translatedText : "Translate to French"}</div>}
              <p className="py-2 pl-2 text-xs font-light">
                {new Date(message.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )
      )}
      <div ref={lastMessageRef} className="mt-auto text-slate-500">
        {typing}
      </div>
    </div>
  );
}

export default ChatBody;
