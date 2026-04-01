from pydantic import BaseModel

class RequestDto(BaseModel):
    question: str
    session_id: str