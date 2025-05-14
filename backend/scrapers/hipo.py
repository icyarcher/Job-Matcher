import json
from playwright.sync_api import sync_playwright

def scrape_hipo_brasov():
    job_list = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://www.hipo.ro/locuri-de-munca/cautajob/Toate-Domeniile/Brasov", timeout=60000)

        # Așteptăm ca joburile să se încarce
        page.wait_for_selector(".job-search-item", timeout=15000)

        job_elements = page.query_selector_all(".job-search-item")

        for job in job_elements:
            try:
                title_el = job.query_selector("a.job-title")
                title = title_el.inner_text().strip()
                link = "https://www.hipo.ro" + title_el.get_attribute("href")

                company_el = job.query_selector("a.job-company")
                company = company_el.inner_text().strip() if company_el else "N/A"

                location_el = job.query_selector("span.job-location")
                location = location_el.inner_text().strip() if location_el else "N/A"

                job_list.append({
                    "title": title,
                    "company": company,
                    "location": location,
                    "link": link
                })
            except Exception as e:
                print(f"Eroare la extragerea unui job: {e}")
                continue

        browser.close()

    # Salvăm rezultatul într-un fișier JSON
    with open("joburi_brasov.json", "w", encoding="utf-8") as f:
        json.dump(job_list, f, ensure_ascii=False, indent=4)

    print(f"Am salvat {len(job_list)} joburi în joburi_brasov.json")

if __name__ == "__main__":
    scrape_hipo_brasov()
