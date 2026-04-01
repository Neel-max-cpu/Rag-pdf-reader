"user client"
import { deleteSession } from '@/utils/apiPaths';
import { useRouter } from 'next/navigation'
import React from 'react'
import { FcLeft } from 'react-icons/fc';


const ChatHeader = () => {
  const router = useRouter();
  const goBack = async ()=>{    
    const sessionId = localStorage.getItem("sessionId");
    if(sessionId){
      await deleteSession(sessionId);
    }
    localStorage.removeItem("sessionId");
    localStorage.removeItem("chatHistory");
    router.push("/");
  }
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <button 
        onClick={goBack}
        className="hover-button text-white hover:cursor-pointer flex items-center space-x-2 p-3 rounded-lg shadow-lg bg-linear-to-r from-emerald-400 to-cyan-400">
        <FcLeft className="w-5 h-5 "/>
        <span className="font-medium">Back</span>
      </button>

      <h1 className="font-semibold text-blue-600 text-xl">Chat with your PDF</h1>
    </div>
  )
}

export default ChatHeader