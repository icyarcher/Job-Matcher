import sys
import json
from bestjobs import scrape_bestjobs

def main():
    if len(sys.argv) < 3:
        print("[EROARE] Te rog oferă argumentele: <keyword> <location>")
        print("Exemplu: python bestjobs_runner.py python Brasov")
        sys.exit(1)

    keyword = sys.argv[1]
    location = sys.argv[2]

    print(f"[INFO] Căutăm joburi BestJobs cu keyword: '{keyword}', location: '{location}'")

    filtered_jobs = scrape_bestjobs(keyword, location)

    out_path = "scrapers/joburi_bestjobs.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(filtered_jobs, f, ensure_ascii=False, indent=4)

    print(f"[INFO] BestJobs: {len(filtered_jobs)} joburi salvate în {out_path}")

if __name__ == "__main__":
    main()
