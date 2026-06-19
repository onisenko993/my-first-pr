from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import anthropic
import os

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

SYSTEM_PROMPT = """Ты — AI-помощник по путешествиям сервиса Nova Horizon (novahorizon.ru).
Твоя задача — помогать клиентам подбирать туры, авиабилеты и отели.

Когда клиент описывает желаемое путешествие, ты должен:
1. Уточнить направление, даты, количество туристов и бюджет (если не указано)
2. Предложить 2-3 конкретных варианта с примерными ценами
3. Дать советы по лучшему времени для бронирования
4. Предложить партнёрские ссылки через Aviasales и Hotellook

Отвечай дружелюбно, кратко и по делу. Используй эмодзи для наглядности.
Всегда указывай, что цены примерные и рекомендуй проверять актуальные на сайте."""

@router.post("/chat")
async def chat(req: ChatRequest):
    api_key = os.getenv("CLAUDE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="AI сервис не настроен")

    try:
        client = anthropic.AsyncAnthropic(api_key=api_key)
        messages = [{"role": m.role, "content": m.content} for m in req.messages]
        response = await client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=messages,
        )
        return {"response": response.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
