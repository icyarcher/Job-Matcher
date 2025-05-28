import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

load_dotenv()

key_path = os.getenv("FIREBASE_KEY_PATH")

if not key_path or not os.path.exists(key_path):
    raise FileNotFoundError("Cheia Firebase nu a fost găsită. Verifică .env și calea setată.")

cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

def save_job(job: dict):
    db.collection("jobs").add(job)
