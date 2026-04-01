"use client";
import { texts } from '@/data/texts'
import React, { JSX, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { FileUp } from 'lucide-react'
import { TbFileUploadFilled } from 'react-icons/tb'
import { FaFileLines, FaGithub, FaHeadSideVirus, FaLinkedin } from 'react-icons/fa6'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { deleteSession, uploadPdf } from '@/utils/apiPaths';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { LuMousePointerClick } from 'react-icons/lu';

const Hero = () => {
  const image = "/images/p1.jpg"

  const iconMap: Record<number, JSX.Element> = {
    1: <FaFileLines className="text-blue-900 stroke-current w-5 h-5" />,
    2: <BsChatLeftTextFill className="text-blue-900 stroke-current w-5 h-5" />,
    3: <FaHeadSideVirus className="text-blue-900 stroke-current w-5 h-5" />
  };

  // navigate
  const uploadRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);


  // move to upload section --
  const moveSection = () => {
    toast('Trying uploading a PDF', {
      icon: '💁‍♂️',
    })
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }


  // upload file --
  const handleUpload = async (selectedFile: File) => {
    if (loading || !selectedFile) return;

    setLoading(true);

    // delete old session --
    const oldSession = localStorage.getItem("sessionId");
    if (oldSession) {
      try {
        await deleteSession(oldSession);
        localStorage.removeItem("sessionId");
        localStorage.removeItem("chatHistory");
      } catch (error) {
        console.log("error");
      }
    }

    await toast.promise(
      uploadPdf(selectedFile),
      {
        loading: "Uploading PDF...",
        success: "File uploaded successfully! Redirecting... 🚀",
        error: "Upload failed. Please try again.",
      }
    )
      .then((res: any) => {
        // save in local storage ---
        localStorage.setItem("sessionId", res.session_id);
        setTimeout(() => {
          router.push("/chat");
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  // drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loading) return;
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loading) return;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return;

    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };


  return (
    <div className="w-full min-h-screen lg:p-30 p-5 pt-40 bg-[#E5E7EB] pl-10 pr-10">

      {/* 1st section */}
      <div className="flex flex-col lg:flex-row w-full space-y-15 lg:space-x-5 mb-40">
        {/* left section */}
        <div className="w-full lg:w-3/5 lg:p-4">
          <h1 className="font-bold text-7xl mb-4">Understand Your</h1>
          <h1 className="font-bold text-7xl mb-10">
            <span className="text-blue-900">Documents</span> Faster.
          </h1>
          <p className="text-justify mb-7 text-gray-700">
            Transform your static PDFs into dynamic research partners. Securely upload your PDFs and gain insights on them using the power of AI.
          </p>
          {/* click to go below */}
          <button
            onClick={moveSection}
            className="hover-button p-4 bg-blue-900 rounded-lg font-medium text-white text-lg shadow-lg hover:bg-linear-to-r from-purple-500 via-fuchsia-700 to-purple-900 hover:cursor-pointer">
            <span className="">Get Started For Free</span>
          </button>
        </div>
        {/* right section  */}
        <div className="w-full lg:flex-1 p-4 items-start justify-center">
          <div className="rounded bg-white p-3 shadow-lg transform rotate-5">
            <img src={image} alt="" className="rounded" />
          </div>
        </div>
      </div>

      {/* 2nd section */}
      <div
        ref={uploadRef}
        className="flex flex-col w-full p-3 items-center justify-center space-y-10 mb-50"
      >
        <div className="flex flex-col">
          <div className="items-center">
            <h1 className="text-center font-medium text-3xl mb-5">Start your research journey</h1>
            <p className="text-center text-gray-500 mb-10">Maximum file size: 50MB. Supports PDF.</p>
          </div>
          {/* pdf upload part */}
          <div
            onClick={() => !loading && inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            // className="flex flex-col w-full lg:w-200 bg-white p-20 rounded-lg items-center justify-center"
            className={`flex flex-col w-full lg:w-200 bg-white p-20 rounded-lg items-center justify-center border-2 border-dashed transition-all duration-200
              ${loading ? "opacity-70 cursor-not-allowed"
                : isDragging ? "border-blue-500 bg-blue-200! scale-[1.02]"
                  : "border-gray-300 hover:border-blue-500 cursor-pointer"}
            `}
          >
            <div className={`rounded-lg p-5 mb-5 transition-all duration-200 ${isDragging ? "bg-white" : "bg-blue-200"}`}>
              {isDragging ?
                <LuMousePointerClick className="text-blue-900 stroke-current w-10 h-10" />
                : <TbFileUploadFilled className="text-blue-900 stroke-current w-10 h-10" />}
            </div>
            <h1 className="font-medium">
              {isDragging ? "Drop your PDF here" : "Drag and drop your PDF here"}
            </h1>
            {isDragging ? (<span className="text-gray-500 text-sm font-medium mb-15"></span>) :
              (<span className="text-gray-500 text-sm font-medium mb-10">or click to browse your local workspace</span>)
            }
            <button
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className={`p-4  rounded-lg font-medium text-white shadow-lg
                ${loading ? "bg-blue-900 opacity-70" : "hover-button bg-blue-900 hover:bg-linear-to-r from-purple-500 via-fuchsia-700 to-purple-900 hover:cursor-pointer"}
              `}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Uploading...
                </div>
              ) : (
                "Upload PDF"
              )}
            </button>

            {/* file name */}
            {file && (
              <p className="mt-3 text-sm text-gray-600">
                {file.name}
              </p>
            )}

            {/* input */}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>


      {/* 3rd section */}
      <div className="flex flex-col">
        <div className="w-1/2">
          <h1 className="font-bold text-3xl mb-4">Architected for Speed</h1>
          <p className="text-justify text-gray-500 font-medium">From complex whitepapers to legal contracts, our pipeline is designed to extract intelligence in second.</p>
        </div>
        {/* boxes */}
        <div className="flex flex-col lg:flex-row gap-6 mt-10">
          {texts.map((item) => (
            <div
              key={item.id}
              className="hover-button flex flex-col items-start bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 px-5 py-5 space-y-5"
            >
              {/* icon */}
              <div className="mb-4 bg-blue-200 rounded-lg p-5">
                {iconMap[item.id]}
              </div>
              {/* title */}
              <h1 className="font-medium text-xl">{item.title}</h1>
              <p className="text-gray-500 font-medium text-sm">{item.description1}</p>
              <p className="font-bold tracking-wide text-blue-600 text-sm">{item.description2}</p>
            </div>
          ))}
        </div>
      </div>


      {/* footer */}
      <div className="mt-20 text-center">
        <hr className="border-t-2 border-gray-300 mb-6" />
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Neel Bhattacharya. All rights reserved.
        </p>
        <div className="flex mt-8 space-x-5 items-center justify-center">
          <a
            href="https://github.com/Neel-max-cpu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-7 h-7 hover:cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/in/neelbhatta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-7 h-7 text-blue-600 rounded hover:cursor-pointer" />
          </a>
        </div>
      </div>


    </div>
  )
}

export default Hero