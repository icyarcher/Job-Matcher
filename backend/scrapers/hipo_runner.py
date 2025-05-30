from hipo import scrape_hipo
import json
import sys
from pathlib import Path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("[EROARE] Furnizeaza locatia (ex: python hipo_runner.py Timisoara)")
        sys.exit(1)

    location = sys.argv[1]
    keyword = sys.argv[2] if len(sys.argv) > 2 else ""

    print(f"[INFO] Cautam joburi Hipo in: {location} cu keyword: '{keyword}'")
    jobs = scrape_hipo(location=location, keyword=keyword)

    output = Path(__file__).parent / "joburi_hipo.json"
    with output.open("w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=4)

    print(f"[INFO] Hipo: {len(jobs)} joburi salvate în {output}")
