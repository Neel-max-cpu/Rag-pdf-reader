from pydantic import BaseModel

class RequestDto(BaseModel):
    question: str