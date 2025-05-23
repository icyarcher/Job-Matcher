from fastapi import APIRouter, Query
from scrapers.bestjobs import scrape_bestjobs
from scrapers.ejobs import scrape_ejobs
from scrapers.hipo import scrape_hipo_brasov
from scrapers.jooble import scrape_jooble
from services.firebase import save_job
import threading
import json


router = APIRouter()

def run_scrape_in_thread(target_fn, *args):
    results = []

    def job():
        try:
            res = target_fn(*args)
            results.extend(res)
        except Exception as e:
            print(f"[ERROR] {target_fn.__name__}:", e)

    thread = threading.Thread(target=job)
    thread.start()
    thread.join()
    return results

@router.get("/scrape")
def run_all_scrapers(keyword: str = Query(...), location: str = Query(...)):
    print(f"[INFO] Pornim scraping pentru: keyword={keyword}, location={location}")
    jobs = []

#    try:
#        results = scrape_bestjobs(limit=50)
#        print(f"[INFO] BestJobs: {len(results)} joburi")
#        jobs += results
#    except Exception as e:
#        print("[ERROR] bestjobs:", e)

#    try:
#        results = run_scrape_in_thread(scrape_ejobs, 30, 2)
#        print(f"[INFO] eJobs: {len(results)} joburi")
#        jobs += results
#    except Exception as e:
#        print("[ERROR] ejobs threading:", e)

    try:
        results = run_scrape_in_thread(scrape_hipo_brasov)
        print(f"[INFO] Hipo: {len(results)} joburi")
        jobs += results
    except Exception as e:
        print("[ERROR] hipo threading:", e)

    try:
        results = scrape_jooble(keyword, location)
        print(f"[INFO] Jooble: {len(results)} joburi")
        jobs += results
    except Exception as e:
        print("[ERROR] jooble:", e)

    print(f"[INFO] Total joburi extrase: {len(jobs)}")

    for job in jobs:
        try:
            save_job(job)
        except Exception as e:
            print("[ERROR] salvare job:", e)

    with open("joburi_salvate.json", "w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

    return {"count": len(jobs), "jobs": jobs}
