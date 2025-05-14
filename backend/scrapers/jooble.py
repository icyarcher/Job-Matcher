import requests
import json

JOOBLE_API_KEY = "6cc533f1-6646-4479-af2d-2bbab9b9f133"
API_URL = f"https://jooble.org/api/{JOOBLE_API_KEY}"

def search_jooble(keywords, location=None, page=1, results_per_page=25, radius_km=80):
    payload = {
        "keywords": keywords,
        "page": str(page),                 # trece ca string
        "ResultOnPage": results_per_page,  # exact cu R mare
        "radius": str(radius_km),          # km
        "companysearch": "false"           # caută doar în titlu/descriere
    }
    if location:
        payload["location"] = location

    headers = {"Content-Type": "application/json"}
    resp = requests.post(API_URL, json=payload, headers=headers)
    resp.raise_for_status()

    data = resp.json()
    print(f"Status: {resp.status_code}, totalCount: {data.get('totalCount')}")
    return data

if __name__ == "__main__":
    data = search_jooble("software", location="Brasov,Romania", page=1, results_per_page=10)

    # După ce ai totalCount>0:
    jobs = data.get("jobs", [])
    print(f"Am găsit {len(jobs)} joburi:")
    for j in jobs:
        print("-", j.get("title"), "@", j.get("company"), "|", j.get("location"))
    # Salvezi:
    with open("jooble_jobs.json", "w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)
