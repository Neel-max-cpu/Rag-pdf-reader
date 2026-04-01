import axiosInstance from "./axiosInstance";

export const API_PATHS={
    UPLOAD_PDF :"/api/upload-pdf",
    ASK_QUESTIONS: "/api/ask-question",
    DELETE_SESSION: "/api/delete-session"
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


export const askQuestions = async (question:string, session_id:string)=>{
    const res = await axiosInstance.post(
        API_PATHS.ASK_QUESTIONS,
        {question, session_id}
    )
    return res?.data;
};


export const deleteSession = async (session_id:string)=>{
    return axiosInstance.delete(`${API_PATHS.DELETE_SESSION}/${session_id}`);
}

export const deleteSessionSync = (session_id:string)=>{
    return axiosInstance.delete(`${API_PATHS.DELETE_SESSION}/${session_id}`);
}