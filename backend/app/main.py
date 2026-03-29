from fastapi import FastAPI

from app.routes.pdf_routes import router as pdf_router
from app.utils.cors_config import allow_CORS

app = FastAPI(title="PDF reader RAG")

# allowed cors
allow_CORS(app)
app.include_router(pdf_router, prefix="/api")

# app health
@app.get("/")
def health():
    return {"status": "ok"}