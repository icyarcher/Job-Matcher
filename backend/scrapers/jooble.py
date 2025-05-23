import requests

JOOBLE_API_KEY = "6cc533f1-6646-4479-af2d-2bbab9b9f133"
API_URL = f"https://jooble.org/api/{JOOBLE_API_KEY}"

def scrape_jooble(keywords: str, location: str, page: int = 1, results_per_page: int = 25):
    payload = {
        "keywords": keywords,
        "page": str(page),
        "ResultOnPage": results_per_page,
        "radius": "80",
        "companysearch": "false",
        "location": location
    }

    headers = {"Content-Type": "application/json"}
    resp = requests.post(API_URL, json=payload, headers=headers)
    resp.raise_for_status()
    data = resp.json()

    jobs = data.get("jobs", [])
    for job in jobs:
        job["source"] = "Jooble"

    return jobs