from playwright.sync_api import sync_playwright
import time

def scrape_ejobs(target_count=100, max_pages=5):
    jobs = []
    first_page = True

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        for pg in range(1, max_pages + 1):
            url = ("https://www.ejobs.ro/locuri-de-munca"
                   if pg == 1 else f"https://www.ejobs.ro/locuri-de-munca/pagina-{pg}")
            page.goto(url, timeout=60000)

            if first_page:
                try:
                    page.click('button[data-test-id="accept-all-cookies-button"]', timeout=5000)
                    page.wait_for_timeout(1000)
                except:
                    pass
                first_page = False

            page.wait_for_selector('a[href^="/user/locuri-de-munca/"]', timeout=10000)
            anchors = page.query_selector_all('a[href^="/user/locuri-de-munca/"]')

            for a in anchors:
                if len(jobs) >= target_count:
                    break

                href = a.get_attribute("href")
                link = href if href.startswith("http") else f"https://www.ejobs.ro{href}"
                title = a.inner_text().strip()

                wrapper = a.evaluate_handle("""
                    el => el.closest('div.job-card-content-middle')
                         || el.closest('div.job-card-content-top')
                         || el.closest('li.listing__item')
                         || el.closest('article')
                """)

                try:
                    company = page.evaluate("(c) => c.querySelector('h3.job-card-content-middle__info--darker a, h3.job-card-content-top__info a').innerText.trim()", wrapper)
                except:
                    company = ""

                try:
                    location = page.evaluate("(c) => c.querySelector('div.job-card-content-middle__info:not(.job-card-content-middle__info--darker), div.job-card-content-top__info').innerText.trim()", wrapper)
                except:
                    location = ""

                try:
                    salary = page.evaluate("(c) => c.querySelector('div.job-card-content-middle__salary, div.job-card-content-top__salary').innerText.trim()", wrapper)
                except:
                    salary = ""

                jobs.append({
                    "title": title,
                    "company": company,
                    "location": location,
                    "salary": salary,
                    "link": link,
                    "source": "eJobs"
                })

            if not anchors or len(jobs) >= target_count:
                break

            time.sleep(1)

        browser.close()

    return jobs
