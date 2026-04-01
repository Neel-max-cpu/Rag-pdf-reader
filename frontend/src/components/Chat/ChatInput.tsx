import React, { useRef, useState } from 'react'
import { Textarea } from '../ui/textarea';
import toast from 'react-hot-toast';
import { askQuestions } from '@/utils/apiPaths';
import { FaTelegramPlane } from 'react-icons/fa';

const ChatInput = ({setMessages}:any) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSend =async () => {
    if(!question.trim()) return;

    const sessionId = localStorage.getItem("sessionId");
    if(!sessionId){
      toast.error("No session present for this chat!");
      return;
    }

    // add user message --
    setMessages((prev:any)=>[
      ...prev,
      {role:"user", text:question}
    ])

    // add the loading bot
    setMessages((prev:any)=>[
      ...prev,
      {role:"bot", text:"", isLoading:true}
    ]);

    setLoading(true);

    try{
      const res = await askQuestions(question, sessionId);
      // replace the last loading 
      setMessages((prev:any)=>{
        const updated = [...prev];
        updated[updated.length - 1]={
          role:"bot",
          text:res.answer,
          isLoading:false
        }
        return updated;
      })
    } catch(err){
      console.log("error: ", err);
      toast.error("Error while sending the message!");
    } finally{
      setLoading(false);
      setQuestion("");

      // reset text area
      if(textareaRef.current){
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    const value = e.target.value;
    setQuestion(value);

    // auto increase size
    const el = e.target;    

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 150) + "px";    
  };
  
  return (
    <div className="p-4 bg-white border-t">      
      <div className="relative mx-auto">      
        <textarea
          onKeyDown={(e)=>{
            if(e.key === "Enter" && !e.shiftKey){
              e.preventDefault();
              handleSend();
            } 
          }}
          value={question}
          onChange={handleInput}
          placeholder="Ask something..."          
          rows={1}
          className="w-full resize-none border rounded-2xl px-4 py-3 pr-12 pb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-slate-800 max-h-37.5 overflow-y-auto"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="absolute hover-button2 right-2 bottom-0 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 active:scale-95">      
          <FaTelegramPlane />
        </button>
      </div>
    </div>
  )
}

export default ChatInput