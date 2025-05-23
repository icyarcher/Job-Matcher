import requests
import time

def scrape_bestjobs(limit=24):
    base_url = "https://api.bestjobs.eu/v1/jobs"
    offset = 0
    all_jobs = []

    while True:
        params = {"offset": offset, "limit": limit}
        headers = {"Accept": "*/*", "Accept-Language": "ro"}

        resp = requests.get(base_url, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        items = data.get("items", [])
        if not items:
            break

        for item in items:
            job_id = item.get("id", "")
            slug = item.get("slug", "")
            title = item.get("title", "").strip()
            company = item.get("companyName", "").strip()
            locs = [loc.get("name", "") for loc in item.get("locations", [])]
            location = ", ".join(locs)
            link = f"https://www.bestjobs.eu/locuri-de-munca/{slug}-{job_id}"

            all_jobs.append({
                "title": title,
                "company": company,
                "location": location,
                "link": link,
                "source": "BestJobs"
            })

        offset += limit
        if offset >= data.get("total", 0):
            break

        time.sleep(0.5)

    return all_jobs