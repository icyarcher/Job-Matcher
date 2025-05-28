from hipo import scrape_hipo
import json
import sys
from pathlib import Path

if __name__ == "__main__":
    keyword = sys.argv[1] if len(sys.argv) > 1 else ""
    print(f"[INFO] Cautăm joburi cu keyword: '{keyword}'")

    jobs = scrape_hipo(keyword)


    output = Path(__file__).parent / "joburi_brasov.json"
    with output.open("w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=4)

    print(f"[INFO] Hipo: {len(jobs)} joburi salvate în {output}")
