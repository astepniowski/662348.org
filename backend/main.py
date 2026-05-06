import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.riot import (
    get_latest_matches_info,
    get_user_information
)
from pydantic import BaseModel

from services.email import send_contact_email

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://662348.org"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''
endpoints
'''
@app.get("/api/riot/matches/{game_name}/{tag_line}")
def get_matches(game_name: str, tag_line: str):
    return get_latest_matches_info(game_name, tag_line)

@app.get("/api/riot/profile/{game_name}/{tag_line}")
def get_user_profile(game_name: str, tag_line: str):
    return get_user_information(game_name, tag_line)

class ContactForm(BaseModel):
    email: str
    message: str

@app.post("/api/contact")
def contact(form : ContactForm):
    send_contact_email(
        form.email,
        form.message
    )
    return {"success": True}