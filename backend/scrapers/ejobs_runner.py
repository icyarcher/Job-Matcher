import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from scrapers.ejobs import scrape_ejobs
import json

def main():
    if len(sys.argv) < 3:
        print("[EROARE] Te rog ofera: <keyword> <location>")
        sys.exit(1)

    keyword = sys.argv[1]
    location = sys.argv[2]

    print(f"[INFO] Pornim scraping eJobs pentru: '{keyword}' în '{location}'")

    jobs = scrape_ejobs(
        target_count=100,
        max_pages=3,
        job_type_filter=keyword,
        location_filter=location
    )

    path = Path(__file__).parent / "joburi_ejobs.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

    print(f"[INFO] eJobs: {len(jobs)} joburi salvate în {path}")

if __name__ == "__main__":
    main()
