from fastapi import FastAPI
from scripts.show_data import OrganizeData
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

data = OrganizeData()


@asynccontextmanager
async def lifespan(app: FastAPI):
    data.organize()  # Roda UMA vez ao iniciar o servidor
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/city-data/{city}")
def get_city(city: str):
    city_obj = data.find(city)
    return city_obj