from fastapi import APIRouter, Query, HTTPException
import httpx
import os

router = APIRouter()

TOKEN = os.getenv("TRAVELPAYOUTS_TOKEN", "")

@router.get("/flights")
async def search_flights(
    origin: str = Query(..., description="IATA-код вылета, напр. MOW"),
    destination: str = Query(..., description="IATA-код назначения, напр. DXB"),
    depart_date: str = Query(..., description="Месяц вылета YYYY-MM"),
    currency: str = "rub",
):
    if not TOKEN:
        raise HTTPException(status_code=500, detail="Travelpayouts token не настроен")
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            "https://api.travelpayouts.com/v1/prices/cheap",
            params={
                "origin": origin,
                "destination": destination,
                "depart_date": depart_date,
                "currency": currency,
                "token": TOKEN,
            },
        )
    return resp.json()

@router.get("/hotels")
async def search_hotels(
    location: str = Query(..., description="Название города на английском, напр. phuket"),
    check_in: str = Query(..., description="Дата заезда YYYY-MM-DD"),
    check_out: str = Query(..., description="Дата выезда YYYY-MM-DD"),
    adults: int = 2,
    limit: int = 4,
):
    if not TOKEN:
        raise HTTPException(status_code=500, detail="Travelpayouts token не настроен")
    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.get(
            "https://engine.hotellook.com/api/v2/cache.json",
            params={
                "location": location,
                "checkIn": check_in,
                "checkOut": check_out,
                "adults": adults,
                "currency": "rub",
                "token": TOKEN,
                "lang": "ru",
                "limit": limit,
            },
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail="Ошибка поиска отелей")
    return resp.json()
