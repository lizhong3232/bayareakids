import requests
import json
import os
import re

def fetch_official_scc_parks():
    print("🌐 Connecting to Santa Clara County ArcGIS API (Refined Query)...")
    url = "https://services1.arcgis.com/4QPaqCJqF1UIaPbN/arcgis/rest/services/SCCParks_SantaClaraCountyParks/FeatureServer/0/query"
    params = {
        "where": "1=1",
        "outFields": "PARK_NAME,ADDRESS,CITY_ZIP,STATUS",
        "returnGeometry": "true",
        "outSR": "4326",
        "f": "json"
    }
    
    try:
        response = requests.get(url, params=params, timeout=20)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        print(f"❌ API Error: {e}")
        return []

    features = data.get('features', [])
    print(f"✅ Received {len(features)} official features.")
    
    formatted_parks = []
    for i, feat in enumerate(features):
        attr = feat.get('attributes', {})
        geom = feat.get('geometry', {})
        
        name = attr.get('PARK_NAME', 'Unknown Park')
        address = attr.get('ADDRESS', '')
        city_zip = attr.get('CITY_ZIP', '')
        
        # Parse City and Zip from "CITY, CA 95032" pattern
        city = "South Bay"
        zip_code = ""
        if city_zip:
            match = re.search(r'([^,]+),\s*CA\s*(\d{5})', city_zip)
            if match:
                city = match.group(1).strip()
                zip_code = match.group(2).strip()
            else:
                city = city_zip.split(',')[0].strip()

        # Simple coordinate extraction from Polygon (taking the first ring's first point as a fallback)
        lat, lng = 37.3382, -121.8863 # Default SJ
        rings = geom.get('rings', [])
        if rings and len(rings[0]) > 0:
            lng = rings[0][0][0]
            lat = rings[0][0][1]
        
        full_address = f"{address}, {city}, CA {zip_code}".strip(", ")
        
        formatted_parks.append({
            "id": f"scc-official-{i}",
            "title": name,
            "description": f"Official Santa Clara County regional park. One of the {len(features)} protected natural spaces managed by the county for public recreation.",
            "category": "Hiking" if any(x in name for x in ["Trail", "Creek", "Quick"]) else "Park",
            "city": city.title(),
            "location_address": full_address,
            "google_maps_url": f"https://www.google.com/maps/search/?api=1&query={name.replace(' ', '+')}+{city.replace(' ', '+')}",
            "lat": lat,
            "lng": lng,
            "tags": ["Official", "County Park", "Public"],
            "min_age": 1,
            "max_age": 12,
            "image_url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
        })
        
    return formatted_parks

if __name__ == "__main__":
    parks = fetch_official_scc_parks()
    if parks:
        # Sort by name for consistency
        parks.sort(key=lambda x: x['title'])
        with open("scripts/scc_parks_data.json", "w") as f:
            json.dump(parks, f, indent=2)
        print(f"💾 Successfully saved {len(parks)} real parks to scripts/scc_parks_data.json")
