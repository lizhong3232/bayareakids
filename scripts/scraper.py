import requests
from bs4 import BeautifulSoup
import json
import os
import re

def scrape_510families():
    print("🚀 Starting scraper for 510 Families...")
    url = "https://www.510families.com/events/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
    except Exception as e:
        print(f"❌ Error fetching URL: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    events = []
    
    # 510 Families uses Events Manager plugin
    # Common container is .em-event or similar
    event_blocks = soup.select('.em-event') or soup.select('article')
    
    print(f"🔍 Found {len(event_blocks)} potential event blocks.")

    for i, block in enumerate(event_blocks[:15]): # Limit to top 15 for now
        try:
            title_el = block.select_one('.em-event-title') or block.select_one('h3')
            if not title_el: continue
            
            title = title_el.get_text(strip=True)
            link = title_el.select_one('a')['href'] if title_el.select_one('a') else url
            
            # Location parsing
            location_el = block.select_one('.em-event-location') or block.select_one('.location')
            location_text = location_el.get_text(strip=True) if location_el else "East Bay, CA"
            
            # Simple City Inference
            city = "Oakland" # Default
            if "Berkeley" in location_text or "Berkeley" in title: city = "Berkeley"
            elif "Alameda" in location_text: city = "Alameda"
            elif "Fremont" in location_text: city = "Fremont"
            elif "Richmond" in location_text: city = "Richmond"
            
            # Description
            desc_el = block.select_one('.em-event-content') or block.select_one('p')
            desc = desc_el.get_text(strip=True)[:150] + "..." if desc_el else "Fun family activity in the East Bay."
            
            # Image
            img_el = block.select_one('img')
            img_url = img_el['src'] if img_el and img_el.has_attr('src') else "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80"

            events.append({
                "id": f"scraped-{i}",
                "title": title,
                "description": desc,
                "category": "Indoor" if "Library" in title or "Museum" in title else "Park",
                "city": city,
                "location_address": location_text,
                "google_maps_url": f"https://www.google.com/maps/search/?api=1&query={title.replace(' ', '+')}+{location_text.replace(' ', '+')}",
                "lat": 37.8715, # Default to Berkeley coords for scraped items
                "lng": -122.2730,
                "tags": ["Scraped", "Real-time", "East Bay"],
                "min_age": 1,
                "max_age": 10,
                "image_url": img_url
            })
        except Exception as e:
            print(f"⚠️ Skipping an event due to error: {e}")

    print(f"✅ Successfully scraped {len(events)} events.")
    return events

def update_ts_file(new_events):
    if not new_events:
        print("📭 No new events to update.")
        return

    file_path = "src/lib/mock-data.ts"
    
    # Read existing static data
    with open(file_path, "r") as f:
        content = f.read()

    # Find the MOCK_ACTIVITIES array
    start_marker = "export const MOCK_ACTIVITIES: Activity[] = ["
    end_marker = "];"
    
    if start_marker not in content:
        print("❌ Could not find MOCK_ACTIVITIES array in ts file.")
        return

    # Prepare new JS objects
    new_entries_str = ""
    for ev in new_events:
        new_entries_str += f"""  {{
    id: '{ev['id']}',
    title: "{ev['title']}",
    description: "{ev['description'].replace('"', "'")}",
    category: '{ev['category']}', city: '{ev['city']}',
    location_address: "{ev['location_address'].replace('"', "'")}",
    google_maps_url: "{ev['google_maps_url']}",
    lat: {ev['lat']}, lng: {ev['lng']},
    tags: {ev['tags']},
    min_age: {ev['min_age']}, max_age: {ev['max_age']},
    image_url: "{ev['image_url']}",
  }},
"""

    # Insert after the start marker
    updated_content = content.replace(start_marker, start_marker + "\n" + new_entries_str)
    
    with open(file_path, "w") as f:
        f.write(updated_content)
    
    print(f"💾 Updated {file_path} with new events.")

if __name__ == "__main__":
    new_data = scrape_510families()
    update_ts_file(new_data)
