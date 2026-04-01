import React, { useEffect, useRef, useState } from 'react'

const ChatMessage = ({ messages }: { messages: Message[] }) => {
  const botAnimation = "images/Siri.webm"

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auto scroll ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // typing ---
  const TypingText = ({ text }: { text: string }) => {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
      let i = 0;

      // adding a slight delay
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayed((prev) => prev + text.charAt(i));
          i++;

          if (i >= text.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
      }, 300);

      return ()=>clearTimeout(timeout);
    }, [text]);

    return <span>{displayed}</span>
  }

  return (
    <div className="h-full flex flex-col p-3 md:px-20">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => {
          // last index since the animation will work on the last message of the bot
          const isLastBot =
            msg.role === "bot" &&
            !msg.isLoading &&
            i == messages.length - 1;
          return (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start items-center space-x-3"}`}
            >
              {/* animation */}
              {msg.role === "bot" && (
                msg.isLoading ? (
                  // loading animation ---
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  </div>

                ) : (
                  // when the message is loaded keep it static ---
                  <video
                    key={isLastBot? "active" : "idle"}
                    className="w-10 h-10"
                    loop muted
                    autoPlay={isLastBot}
                  >
                    <source src={botAnimation} type="video/webm" />
                  </video>
                )
              )}

              {/* message box--- */}
              <div
                className={`bubble-box 
                ${msg.role === "user"
                    ? "bg-blue-200/40 text-blue-700"
                    : "bg-white text-gray-700"
                  }
              `}
              >
                {msg.isLoading ? (
                  "Thinking..."
                ) : msg.role === "bot" && isLastBot ? (
                  <TypingText text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          )
        })}

        {/* auto scroll */}
        <div ref={bottomRef} />


        {/* static --- */}
        {/* user message */}
        {/* <div className="flex justify-end">
          <div className="bubble-box bg-blue-200/40 text-blue-700 ">
            what is this document about?
          </div>
        </div> */}

        {/* bot message */}
        {/* <div className="flex justify-start items-center space-x-3"> */}
        {/* animation */}
        {/* <video
            className="w-10 h-10"
            autoPlay loop muted
          >
            <source src={botAnimation} type="video/webm" />
          </video>
          <div className="bubble-box bg-white text-gray-700">
            This document discussess...
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default ChatMessage