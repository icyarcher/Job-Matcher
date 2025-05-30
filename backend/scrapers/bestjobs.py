import json
import unicodedata
from playwright.sync_api import sync_playwright

def normalize(text):
    return unicodedata.normalize("NFD", text.lower()).encode("ascii", "ignore").decode("utf-8")

def scrape_bestjobs(keyword, location):
    print(f"[INFO] Cautam joburi BestJobs cu keyword: '{keyword}', location: '{location}'")
    job_list = []

    keyword_norm = normalize(keyword)
    location_norm = normalize(location)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://www.bestjobs.eu/ro/locuri-de-munca", timeout=60000)

        # Accept cookies
        try:
            btn = page.locator('button[data-test-id="cookie-consent-accept"]')
            btn.wait_for(state="visible", timeout=5000)
            btn.click(force=True)
            page.wait_for_timeout(2000)
        except:
            pass

        # Scroll + click
        while True:
            try:
                page.mouse.wheel(0, 3000)
                page.wait_for_timeout(2000)

                load_more_button = page.locator('button:has-text("Încarcă mai mult")')
                if load_more_button.is_visible():
                    print("[INFO] Apasam pe 'Incarcă mai mult'...")
                    load_more_button.click()
                    page.wait_for_timeout(2500)
                else:
                    break
            except:
                break

        job_cards = page.query_selector_all("a.absolute.inset-0.z-1")
        print(f"[INFO] Am găsit {len(job_cards)} joburi brute...")

        for link_el in job_cards:
            try:
                link = "https://www.bestjobs.eu" + link_el.get_attribute("href")
                title = link_el.get_attribute("aria-label") or "N/A"
                title_norm = normalize(title)

                wrapper = link_el.evaluate_handle("el => el.closest('div.grid')")

                company = page.evaluate(
                    "(el) => el.querySelector('div.text-ink-medium')?.innerText.trim() || 'N/A'",
                    wrapper
                )

                # extragem toate locațiile din link-urile cu href ce conțin 'locuri-de-munca-in'
                location_links = page.evaluate(
                    """(el) => {
                        return Array.from(
                            el.parentElement.parentElement.querySelectorAll('a[href*="locuri-de-munca-in"]')
                        ).map(a => a.innerText.trim());
                    }""",
                    wrapper
                )

                all_locations_norm = [normalize(loc) for loc in location_links]

                if keyword_norm in title_norm and any(location_norm in loc for loc in all_locations_norm):
                    print(f"[MATCH] {title} | LOCATII: {', '.join(location_links)}")
                    job_list.append({
                        "title": title,
                        "company": company,
                        "location": ", ".join(location_links),
                        "link": link,
                        "source": "BestJobs"
                    })

            except Exception as e:
                print(f"[EROARE] la extragerea unui job: {e}")
                continue

        browser.close()

    with open("joburi_bestjobs_ALL.json", "w", encoding="utf-8") as f:
        json.dump(job_list, f, ensure_ascii=False, indent=4)

    print(f"[INFO] Am salvat toate cele {len(job_list)} joburi in joburi_bestjobs_ALL.json")
    return job_list

if __name__ == "__main__":
    scrape_bestjobs("inginer", "brasov")
