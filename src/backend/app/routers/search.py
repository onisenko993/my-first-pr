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
    city_id: int = Query(..., description="ID города Hotellook"),
    check_in: str = Query(..., description="Дата заезда YYYY-MM-DD"),
    check_out: str = Query(..., description="Дата выезда YYYY-MM-DD"),
    adults: int = 2,
):
    if not TOKEN:
        raise HTTPException(status_code=500, detail="Travelpayouts token не настроен")
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            "https://engine.hotellook.com/api/v2/search/start.json",
            params={
                "cityId": city_id,
                "checkIn": check_in,
                "checkOut": check_out,
                "adults": adults,
                "currency": "rub",
                "token": TOKEN,
                "lang": "ru",
            },
        )
    return resp.json()
