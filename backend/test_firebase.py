from services.firebase import save_job

job = {
    "title": "Test Job",
    "company": "Demo Inc",
    "location": "Remote",
    "link": "https://example.com",
    "source": "Test"
}

save_job(job)
print("Job salvat!")
