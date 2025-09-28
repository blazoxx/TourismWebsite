from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# allow local frontend dev; change to your domain in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Button(BaseModel):
    title: str
    payload: str

class Message(BaseModel):
    type: str   # "text", "buttons", or "link"
    text: str
    buttons: Optional[List[Button]] = None
    link: Optional[str] = None   # ✅ support for links

class UserRequest(BaseModel):
    message: str
    payload: Optional[str] = None

class BotResponse(BaseModel):
    messages: List[Message]

CITY_DESC = {
    "CITY_RANCHI": {
        "desc": "Known as the City of Waterfalls, Ranchi is surrounded by natural beauty with sites like Dassam and Hundru Falls. Tagore Hill and Rock Garden add cultural and scenic charm",
        "link": "https://en.wikipedia.org/wiki/Ranchi"
    },
    "CITY_DEOGHAR": {
        "desc": "A spiritual hub, Deoghar houses the famous Baba Baidyanath Jyotirlinga temple. It attracts millions of devotees during the Shravani Mela.",
        "link": "https://en.wikipedia.org/wiki/Deoghar"
    },
    "CITY_JAMSHEDPUR": {
        "desc": "An industrial city founded by Jamshedji Tata, famous for Jubilee Park and Dimna Lake. It offers a mix of green spaces and modern industry.",
        "link": "https://en.wikipedia.org/wiki/Jamshedpur"
    }
}

def main_menu():
    """Reusable main menu for looping back."""
    return [
        Message(
            type="buttons",
            text="What would you like to do next?",
            buttons=[
                Button(title="Explore by Cities", payload="EXPLORE_CITIES"),
                Button(title="Explore by Interest", payload="EXPLORE_INTEREST"),
                
            ]
        )
    ]

@app.post("/api/message", response_model=BotResponse)
async def chat(req: UserRequest):
    msg = req.message.lower()
    payload = (req.payload or "").upper()

    # Explore cities menu
    if payload == "EXPLORE_CITIES" or "explore by cities" in msg:
        return BotResponse(messages=[
            Message(type="text", text="Explore by Cities"),
            Message(
                type="buttons",
                text="Pick a city",
                buttons=[
                    Button(title="Ranchi", payload="CITY_RANCHI"),
                    Button(title="Deoghar", payload="CITY_DEOGHAR"),
                    Button(title="Jamshedpur", payload="CITY_JAMSHEDPUR"),
                ]
            )
        ])

    # Show city details
    if payload in CITY_DESC:
        city = CITY_DESC[payload]
        return BotResponse(messages=[
            Message(type="text", text=city["desc"]),
            Message(type="link", text=city["link"], link=city["link"]),
            *main_menu()   # ✅ loop back to main menu
        ])

    # Explore by Interest (dummy for now, can expand later)
    if payload == "EXPLORE_INTEREST":
        return BotResponse(messages=[
            Message(type="text", text="Great! Choose an interest:"),
            Message(
                type="buttons",
                text="Select an interest",
                buttons=[
                    Button(title="Heritage", payload="INTEREST_HERITAGE"),
                    Button(title="Wildlife", payload="INTEREST_WILDLIFE"),
                    Button(title="Adventure", payload="INTEREST_ADVENTURE"),
                ]
            )
        ])

    # Example interest handling
    if payload.startswith("INTEREST_"):
        return BotResponse(messages=[
            Message(type="text", text=f"Here are some recommendations for {payload.replace('INTEREST_', '').title()}..."),
            *main_menu()   # ✅ loop back again
        ])

    # Default fallback
    return BotResponse(messages=[
        Message(type="text", text="I didn’t get that. Try one of these options:"),
        *main_menu()
    ])
