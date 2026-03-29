import chromadb
from chromadb import Settings

client = chromadb.Client(
    # data is stored here --
    Settings(persist_directory="./chroma_db")
)

collection = client.get_or_create_collection(name="pdf_docs")