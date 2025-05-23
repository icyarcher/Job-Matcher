import firebase_admin
from firebase_admin import credentials, firestore
import os

# Calea către fișierul tău de service account
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def save_job(job: dict):
    # poți adăuga verificări de duplicat aici, dacă vrei
    db.collection("jobs").add(job)