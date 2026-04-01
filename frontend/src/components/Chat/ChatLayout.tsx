"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Chathura } from 'next/font/google';
import { deleteSession } from '@/utils/apiPaths';



const ChatLayout = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "What do you want to ask? I'm here for it 😃",
      isLoading: false
    }
  ]);


  // /*
  useEffect(() => {
    const run = async () => {
      const sessionId = localStorage.getItem("sessionId");
      const chatHistory = localStorage.getItem("chatHistory");

      if (!sessionId) {
        toast.error("No Context present, please upload a PDF!");
        router.push("/");
      }

      if (chatHistory) {
        setMessages(JSON.parse(chatHistory));
      }      
    };

    run();
  }, []);
  // */

  // persist chat
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <div className="flex-1 overflow-hidden">
        <ChatMessage messages={messages}/>
      </div>
      <ChatInput  setMessages={setMessages}/>
    </div>
  )
}

export default ChatLayout