from pypdf import PdfReader
import io

from app.services.rag_service import store_chunks
from app.utils.chunking import chunk_text


async def process_pdf(file):
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
    # store
    store_chunks(chunks)

    return {
        "message": "PDF processed successfully",
        "pages": page_count,
        "text_length": len(text),
        "chunks": len(chunks)
    }
