from pypdf import PdfReader
import io

from app.db.chroma_client import collection
from app.services.rag_service import store_chunks
from app.utils.chunking import chunk_text


async def process_pdf(file, session_id):
    content = await file.read()
    pdf = PdfReader(io.BytesIO(content))

    text = ""
    page_count = 0
    for page in pdf.pages:
        extracted_text = page.extract_text()
        if extracted_text:
            text += extracted_text
        page_count += 1

    chunks = chunk_text(text)

    # store with session_id
    store_chunks(chunks, session_id)

    return {
        "session_id": session_id,
        "message": "PDF processed successfully",
        "pages": page_count,
        "text_length": len(text),
        "chunks": len(chunks)
    }


def delete_session(session_id: str):
    collection.delete(where={"session_id":session_id})
    return {"message": "Session deleted successfully"};