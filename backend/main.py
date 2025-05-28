from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.jobs import router as jobs_router

app = FastAPI(title="Job Matcher API")

# Activare CORS pentru frontendul React de pe localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adaugă aici frontendul tău
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Job Matcher backend running"}
