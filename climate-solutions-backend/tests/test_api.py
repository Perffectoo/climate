from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home():
    res = client.get("/")
    assert res.status_code == 200


def test_solutions():
    res = client.get("/solutions")
    assert res.status_code == 200