from playwright.sync_api import sync_playwright
import json
from pathlib import Path

def scrape_hipo(keyword: str = "") -> list[dict]:
    job_list = []
    keyword = keyword.lower().strip()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        base_url = "https://www.hipo.ro/locuri-de-munca/cautajob/Toate-Domeniile/Brasov"
        page.goto(base_url, timeout=60000)

        page_num = 1
        max_pages = 5  # limită de siguranță

        while True:
            print(f"[INFO] Procesăm pagina {page_num}...")

            page.wait_for_timeout(3000)
            job_links = page.query_selector_all("a.job-title")

            for link_el in job_links:
                try:
                    title = link_el.inner_text().strip()
                    if keyword and keyword not in title.lower():
                        continue

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

            # Găsim linkul către pagina următoare
            try:
                next_el = page.query_selector("a.page-next[rel='next']")
                if next_el and page_num < max_pages:
                    next_href = next_el.get_attribute("href")
                    if next_href:
                        page.goto(next_href, timeout=60000)
                        page_num += 1
                        continue
                break
            except Exception as e:
                print(f"[INFO] Sfârșit paginare sau eroare: {e}")
                break

        browser.close()

    return job_list
