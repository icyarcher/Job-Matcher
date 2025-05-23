from fastapi import FastAPI
from routes.jobs import router as jobs_router

app = FastAPI(title="Job Matcher API")
app.include_router(jobs_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Job Matcher backend running"}