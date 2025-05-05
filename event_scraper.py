import os
import instaloader
from pyairtable import Api
import re

AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
BASE_ID = os.getenv("AIRTABLE_BASE_ID")
ORG_TABLE = os.getenv("ORGANISATION_TABLE", "OrganisationData")
EVENT_TABLE = os.getenv("EVENT_TABLE", "MuslimCalender")

api = Api(AIRTABLE_API_KEY)
org_table = api.table(BASE_ID, ORG_TABLE)
event_table = api.table(BASE_ID, EVENT_TABLE)

KEYWORDS = ["lezing", "iftar", "feest", "eid", "benefiet", "evenement", "bazaar", "kindermiddag", "vrouwenavond"]

def caption_lijkt_event(text):
    return any(kw.lower() in text.lower() for kw in KEYWORDS)

def scrape_instagram_events(insta_username):
    L = instaloader.Instaloader()
    posts = []
    try:
        profile = instaloader.Profile.from_username(L.context, insta_username)
        for post in profile.get_posts():
            caption = post.caption or ""
            if caption_lijkt_event(caption):
                posts.append({
                    "EventName": caption.split("\n")[0][:100],
                    "Description": caption,
                    "SourceOfEventInfo": f"https://instagram.com/{insta_username}",
                    "Image": post.url
                })
            if len(posts) >= 3:
                break
    except Exception as e:
        print(f"❌ Kon profiel {insta_username} niet scrapen: {e}")
    return posts

def already_exists(event_name):
    existing = event_table.all(formula=f"{{EventName}} = '{event_name}'")
    return len(existing) > 0

def main():
    records = org_table.all()
    for org in records:
        fields = org.get("fields", {})
        insta_url = fields.get("InstagramProfile", "")
        if not insta_url or "instagram.com/" not in insta_url:
            continue
        username = insta_url.strip("/").split("/")[-1]
        print(f"📥 Scrapen van @{username}...")

        events = scrape_instagram_events(username)
        for event in events:
            if already_exists(event["EventName"]):
                print(f"⚠️ Event al bekend: {event['EventName']}")
                continue
            event.update({
                "Organisation": fields.get("OrganisationName"),
            })
            event_table.create(event)
            print(f"✅ Toegevoegd: {event['EventName']}")

if __name__ == "__main__":
    main()
