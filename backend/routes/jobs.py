from fastapi import APIRouter, Query
from scrapers.bestjobs import scrape_bestjobs
from scrapers.ejobs import scrape_ejobs
from scrapers.hipo import scrape_hipo
from scrapers.jooble import scrape_jooble
from services.firebase import save_job
import threading
import json
import subprocess
from pathlib import Path
import sys
import hashlib
from services.firebase import db

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


    # STERGE DIN FIREBASE INAINTE DE ORICE RUN
def clear_jobs_collection():
    jobs_ref = db.collection("jobs").stream()
    for doc in jobs_ref:
        doc.reference.delete()
    print("[INFO] Toate joburile au fost sterse din Firebase.")


@router.get("/scrape")
def run_all_scrapers(keyword: str = Query(...), location: str = Query(...)):
    print(f"[INFO] Pornim scraping pentru: keyword={keyword}, location={location}")
    clear_jobs_collection()

    jobs = []

# scraper BestJobs
    try:
        python_exec = sys.executable
        subprocess.run([python_exec, "scrapers/bestjobs_runner.py", keyword, location], check=True)

        path = Path("scrapers/joburi_bestjobs.json")
        if path.exists():
            with open(path, "r", encoding="utf-8") as f:
                bestjobs = json.load(f)
                print(f"[INFO] BestJobs: {len(bestjobs)} joburi")
                jobs += bestjobs
    except Exception as e:
        print("[ERROR] bestjobs subprocess:", e)

# scraper hipo
    try:
        python_exec = sys.executable
        subprocess.run([python_exec, "scrapers/hipo_runner.py", location ,keyword], check=True)

        path = Path("scrapers/joburi_brasov.json")
        if path.exists():
            with open(path, "r", encoding="utf-8") as f:
                hipo_jobs = json.load(f)
                print(f"[INFO] Hipo: {len(hipo_jobs)} joburi")
                jobs += hipo_jobs
    except Exception as e:
        print("[ERROR] hipo subprocess:", e)

# scraper ejobs
    try:
        python_exec = sys.executable
        subprocess.run([python_exec, "scrapers/ejobs_runner.py", keyword, location], check=True)
        path = Path("scrapers/joburi_ejobs.json")
        if path.exists():
            with open(path, "r", encoding="utf-8") as f:
                ejobs = json.load(f)
                print(f"[INFO] eJobs: {len(ejobs)} joburi")
                jobs += ejobs
    except Exception as e:
        print("[ERROR] ejobs subprocess:", e)

    print(f"[INFO] Total joburi extrase: {len(jobs)}")

#    try:
#        results = scrape_jooble(keyword, location)
#        print(f"[INFO] Jooble: {len(results)} joburi")
#        jobs += results
#    except Exception as e:
#        print("[ERROR] jooble:", e)

#    print(f"[INFO] Total joburi extrase: {len(jobs)}")

# salvare joburi daca sunt caractere speciale
    for job in jobs:
        try:
            link = job.get("link")
            if not link:
                print("[WARN] Job fara link, ignorat.")
                continue

            job_id = hashlib.sha256(link.encode()).hexdigest()
            from services.firebase import db
            job_ref = db.collection("jobs").document(job_id)

            if not job_ref.get().exists:
                job_ref.set(job)
                print(f"[SAVE] Job salvat: {link}")
            else:
                print(f"[SKIP] Job deja salvat: {link}")

        except Exception as e:
            print("[ERROR] salvare job:", e)

    with open("joburi_salvate.json", "w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

    return {"count": len(jobs), "jobs": jobs}

@router.get("/jobs")
def get_saved_jobs():
    from services.firebase import db
    try:
        jobs_ref = db.collection("jobs").stream()
        jobs = [doc.to_dict() for doc in jobs_ref]
        return {"count": len(jobs), "jobs": jobs}
    except Exception as e:
        print("[ERROR] citire Firebase:", e)
        return {"count": 0, "jobs": [], "error": str(e)}
