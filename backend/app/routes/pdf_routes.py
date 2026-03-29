from fastapi import APIRouter, UploadFile, File

from app.dto.RequestDto import RequestDto
from app.services import pdf_service
from app.services.rag_service import ask_question

router = APIRouter()

# health
@router.get("/pdf-health")
def test_route():
    return {"message": "PDF route is working!"}


# pdf upload
@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    return await pdf_service.process_pdf(file)

# ask question based on the PDF
@router.post("/ask-question")
def ask(req: RequestDto):
    return ask_question(req.question)