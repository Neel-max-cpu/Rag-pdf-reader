import uuid

from fastapi import APIRouter, UploadFile, File

from app.dto.RequestDto import RequestDto
from app.services import pdf_service, rag_service

router = APIRouter()

# health
@router.get("/pdf-health")
def test_route():
    return {"message": "PDF route is working!"}


# pdf upload
@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    session_id = str(uuid.uuid4())
    return await pdf_service.process_pdf(file, session_id)

# ask question based on the PDF
@router.post("/ask-question")
def ask(req: RequestDto):
    return rag_service.ask_question(req.question, req.session_id)

# delete context
@router.delete("/delete-session/{session_id}")
def delete_session(session_id: str):
    return pdf_service.delete_session(session_id)