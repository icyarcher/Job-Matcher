import requests
import json
import time

def scrape_bestjobs(limit=24):
    base_url = "https://api.bestjobs.eu/v1/jobs"
    offset = 0
    all_jobs = []

    while True:
        # 1. Construieşte parametrii
        params = {
            "offset": offset,
            "limit": limit
        }
        headers = {
            "Accept": "*/*",
            "Accept-Language": "ro"
        }

        # 2. Apelează API-ul
        resp = requests.get(base_url, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        items = data.get("items", [])
        if not items:
            break

        # 3. Parsează fiecare job
        for item in items:
            job_id   = item.get("id", "")
            slug     = item.get("slug", "")
            title    = item.get("title", "").strip()
            company  = item.get("companyName", "").strip()
            # uneori sunt mai multe locații
            locs     = [loc.get("name", "") for loc in item.get("locations", [])]
            location = ", ".join(locs)

            # construieşte link-ul după pattern-ul site-ului
            link = f"https://www.bestjobs.eu/locuri-de-munca/{slug}-{job_id}"

            all_jobs.append({
                "id":       job_id,
                "title":    title,
                "company":  company,
                "location": location,
                "link":     link
            })

        # 4. Înainte să continui, verifici dacă ai ajuns la total
        total = data.get("total", 0)
        offset += limit
        if offset >= total:
            break

        # 5. Ca să nu bombardezi serverul, opreşti puţin
        time.sleep(0.5)

    return all_jobs


if __name__ == "__main__":
    jobs = scrape_bestjobs(limit=24)
    print(f"Am găsit {len(jobs)} joburi în total.\n")
    with open("bestjobs_jobs.json", "w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

