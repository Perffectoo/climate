from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

solutions = [
    {
        "id": 1,
        "name": "Rainwater Harvesting",
        "risk": "Drought",
        "sector": "Water",
        "cost": "Medium",
    },
    {
        "id": 2,
        "name": "Flood Barriers",
        "risk": "Flood",
        "sector": "Infrastructure",
        "cost": "High",
    },
    {
        "id": 3,
        "name": "Green Roofs",
        "risk": "Heatwave",
        "sector": "Urban",
        "cost": "High",
    },
]

@app.get("/")
def home():
    return {"message": "API is running"}

@app.get("/solutions")
def get_solutions(risk: str = None):
    if risk:
        return [s for s in solutions if s["risk"] == risk]
    return solutions