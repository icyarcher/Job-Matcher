from playwright.sync_api import sync_playwright
import time
import json


def scrape_ejobs(target_count=100, max_pages=5, location_filter=None, job_type_filter=None):
    jobs = []
    seen_links = set()
    cookies_accepted = False

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        for pg in range(1, max_pages + 1):
            url = ("https://www.ejobs.ro/locuri-de-munca"
                   if pg == 1 else f"https://www.ejobs.ro/locuri-de-munca/pagina-{pg}")
            print(f"[INFO] Accesez: {url}")
            page.goto(url, timeout=60000)

            # cookies
            if not cookies_accepted:
                try:
                    print("[INFO] Caut butonul de cookies...")
                    page.wait_for_selector('button[data-test-id="accept-all-cookies-button"]', timeout=5000)
                    page.click('button[data-test-id="accept-all-cookies-button"]')
                    page.wait_for_timeout(1000)
                    print("[INFO] Cookies acceptate.")
                except:
                    print("[WARN] Butonul de cookies nu a fost gasit sau a fost deja apasat.")
                cookies_accepted = True

            scroll_step = 1500
            max_empty_scrolls = 5
            pause = 500
            empty_scrolls = 0
            last_height = 0

            for i in range(100):
                page.evaluate(f"window.scrollBy(0, {scroll_step})")
                print(f"[SCROLL {i+1}] Scroll +{scroll_step}px...")
                page.wait_for_timeout(pause)

                new_height = page.evaluate("document.documentElement.scrollHeight")
                if new_height == last_height:
                    empty_scrolls += 1
                    print(f"[SCROLL] Nicio modificare ({empty_scrolls}/5).")
                    if empty_scrolls >= max_empty_scrolls:
                        print("[SCROLL] Am ajuns la finalul paginii.")
                        break
                else:
                    empty_scrolls = 0
                last_height = new_height

            page.wait_for_selector('a[href^="/user/locuri-de-munca/"]', timeout=10000)
            anchors = page.query_selector_all('a[href^="/user/locuri-de-munca/"]')

            for a in anchors:
                if len(jobs) >= target_count:
                    break

                href = a.get_attribute("href")
                link = href if href.startswith("http") else f"https://www.ejobs.ro{href}"

                if link in seen_links:
                    continue
                seen_links.add(link)

                title = a.inner_text().strip()

                wrapper = a.evaluate_handle("""
                    el => el.closest('div.job-card-content-middle')
                         || el.closest('div.job-card-content-top')
                         || el.closest('li.listing__item')
                         || el.closest('article')
                """)

                try:
                    company = page.evaluate("(c) => c.querySelector('h3.job-card-content-middle__info--darker a, h3.job-card-content-top__info a')?.innerText.trim()", wrapper)
                except:
                    company = ""

                try:
                    location = page.evaluate("(c) => c.querySelector('div.job-card-content-middle__info:not(.job-card-content-middle__info--darker), div.job-card-content-top__info')?.innerText.trim()", wrapper)
                except:
                    location = ""

                try:
                    salary = page.evaluate("(c) => c.querySelector('div.job-card-content-middle__salary, div.job-card-content-top__salary')?.innerText.trim()", wrapper)
                except:
                    salary = ""

                job = {
                    "title": title,
                    "company": company or "",
                    "location": location or "",
                    "salary": salary or "",
                    "link": link,
                    "source": "eJobs"
                }

                if location_filter and location_filter.lower() not in job["location"].lower():
                    continue
                if job_type_filter and job_type_filter.lower() not in job["title"].lower():
                    continue

                jobs.append(job)

            if not anchors or len(jobs) >= target_count:
                break

            time.sleep(1)

        browser.close()

    return jobs