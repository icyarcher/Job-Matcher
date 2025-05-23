from playwright.sync_api import sync_playwright
import json
from pathlib import Path

def scrape_hipo_brasov() -> list[dict]:
    job_list = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://www.hipo.ro/locuri-de-munca/cautajob/Toate-Domeniile/Brasov", timeout=60000)
        page.wait_for_timeout(5000)

        job_links = page.query_selector_all("a.job-title")

        for link_el in job_links:
            try:
                title = link_el.inner_text().strip()
                href = link_el.get_attribute("href")
                full_link = "https://www.hipo.ro" + href

                wrapper = link_el.evaluate_handle("el => el.closest('div.job-list-item') || el.closest('div')")

                try:
                    company = page.evaluate(
                        "(el) => el.querySelector('p.company-name span')?.innerText.trim() || 'N/A'",
                        wrapper
                    )
                except:
                    company = "N/A"

                try:
                    location = page.evaluate(
                        "(el) => { const badge = el.querySelector('span.badge-type'); return badge ? badge.innerText.trim() : 'N/A'; }",
                        wrapper
                    )
                except:
                    location = "N/A"

                job_list.append({
                    "title": title,
                    "company": company,
                    "location": location,
                    "link": full_link,
                    "source": "Hipo"
                })

            except Exception as e:
                print(f"[EROARE] la extragerea unui job: {e}")
                continue

        browser.close()

    return job_list

# Dacă rulezi manual, salvează în JSON
if __name__ == "__main__":
    jobs = scrape_hipo_brasov()
    output_path = Path(__file__).parent / "joburi_brasov.json"
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(jobs, f, ensure_ascii=False, indent=4)
    print(f"✅ Am salvat {len(jobs)} joburi în {output_path}")
