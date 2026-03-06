from fastapi import FastAPI
from scripts.show_data import OrganizeData
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
data = OrganizeData()

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