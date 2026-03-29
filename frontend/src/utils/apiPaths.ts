import axiosInstance from "./axiosInstance";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const API_PATHS={
    UPLOAD_PDF :"/api/upload-pdf",
    ASK_QUESTIONS: "/api/ask-question",
}


export const uploadPdf = async(file:File)=>{
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post(
        API_PATHS.UPLOAD_PDF,
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            },
        }
    );

    return res?.data;
};


export const askQuestions = async (question:string)=>{
    const res = await axiosInstance.post(
        API_PATHS.ASK_QUESTIONS,
        {question}
    )
    return res?.data;
};