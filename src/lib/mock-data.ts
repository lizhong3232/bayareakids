export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'Park' | 'Library' | 'Indoor' | 'Hiking' | 'Activity';
  city: string;
  location_address: string;
  google_maps_url: string;
  lat: number;
  lng: number;
  tags: string[];
  min_age: number;
  max_age: number;
  image_url: string;
  event_time?: string;
}

const createMapsUrl = (title: string, address: string) => 
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title} ${address}`)}`;

export const MOCK_ACTIVITIES: Activity[] = [
  // --- REAL-TIME ACTIVITIES (Scraped from 510 Families) ---
  {
    id: 'scraped-1',
    title: "Explore Blake Garden",
    description: "Beautiful 10-acre garden with diverse plant life. Perfect for a morning family walk.",
    category: 'Activity', city: 'Berkeley',
    event_time: "Sat, Mar 14 · 9:00 AM - 4:00 PM",
    location_address: "70 Rincon Rd, Kensington, CA 94707",
    google_maps_url: createMapsUrl("Blake Garden", "70 Rincon Rd, Kensington, CA 94707"),
    lat: 37.9015, lng: -122.2830,
    tags: ["Nature", "Garden", "Real-time"],
    min_age: 1, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  },
  {
    id: 'scraped-2',
    title: "Ruby's Tumbling Open Gym",
    description: "Indoor play and tumbling session for toddlers. Great for burning energy.",
    category: 'Activity', city: 'Alameda',
    event_time: "Sun, Mar 15 · 10:00 AM - 12:00 PM",
    location_address: "2315 Lincoln Ave, Alameda, CA 94501",
    google_maps_url: createMapsUrl("Ruby's Tumbling", "2315 Lincoln Ave, Alameda, CA 94501"),
    lat: 37.7650, lng: -122.2410,
    tags: ["Gymnastics", "Indoor", "Energy Burn"],
    min_age: 1, max_age: 5,
    image_url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",
  },

  // --- OFFICIAL SANTA CLARA COUNTY PARKS (Fetched via ArcGIS API) ---
  {
    id: "scc-official-4",
    title: "Almaden Quicksilver",
    description: "Expansive regional park known for its deep history and diverse hiking trails. Great for nature exploration.",
    category: "Hiking", city: "San Jose",
    location_address: "21785 Almaden Rd., San Jose, CA 95120",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Almaden+Quicksilver+San+Jose",
    lat: 37.1661, lng: -121.8263,
    tags: ["Official", "County Park", "Nature"],
    min_age: 1, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
  },
  {
    id: "scc-official-7",
    title: "Vasona Lake County Park",
    description: "The crown jewel of Santa Clara County parks. Features a lake, Billy Jones steam train, and carousel.",
    category: "Park", city: "Los Gatos",
    location_address: "333 Blossom Hill Rd., Los Gatos, CA 95032",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Vasona+Los+Gatos",
    lat: 37.2376, lng: -121.9745,
    tags: ["Trains", "Carousel", "Lake"],
    min_age: 0, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1533577116850-9ac6608ff28e?w=800&q=80"
  },
  {
    id: "scc-official-21",
    title: "Rancho San Antonio",
    description: "Extremely popular for families. Flat paths lead to Deer Hollow Farm to see animals.",
    category: "Park", city: "Cupertino",
    location_address: "22500 Cristo Rey Drive, Cupertino, CA 95014",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Rancho+San+Antonio+Cupertino",
    lat: 37.3323, lng: -122.0749,
    tags: ["Farm Animals", "Stroller Friendly", "Busy"],
    min_age: 1, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1527362950785-f487a7c1fe48?w=800&q=80"
  },
  {
    id: "scc-official-5",
    title: "Ed R. Levin County Park",
    description: "Vast Milpitas park with Sandy Wool Lake and multiple playground areas.",
    category: "Park", city: "Milpitas",
    location_address: "3100 Calaveras Rd., Milpitas, CA 95035",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Ed+R.+Levin+Milpitas",
    lat: 37.4452, lng: -121.8582,
    tags: ["Lake", "Fishing", "Hiking"],
    min_age: 1, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
  },
  {
    id: "scc-official-26",
    title: "Hellyer County Park",
    description: "Features a modern playground and a splash pad, connected to the Coyote Creek Trail.",
    category: "Park", city: "San Jose",
    location_address: "985 Hellyer Ave., San Jose, CA 95111",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Hellyer+San+Jose",
    lat: 37.2841, lng: -121.8118,
    tags: ["Splash Pad", "Paved Trail", "Park"],
    min_age: 1, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80"
  },
  {
    id: "scc-official-22",
    title: "Santa Teresa County Park",
    description: "Offers great views of the valley and safe hiking trails for older toddlers.",
    category: "Hiking", city: "San Jose",
    location_address: "260 Bernal Rd., San Jose, CA 95119",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Santa+Teresa+San+Jose",
    lat: 37.2010, lng: -121.7963,
    tags: ["Views", "Nature", "Hiking"],
    min_age: 2, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
  },
  {
    id: "scc-official-0",
    title: "Sanborn County Park",
    description: "Deep in the redwoods. Very shaded and cool even in summer.",
    category: "Hiking", city: "Saratoga",
    location_address: "16055 Sanborn Rd., Saratoga, CA 95070",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Sanborn+Saratoga",
    lat: 37.2350, lng: -122.0605,
    tags: ["Redwoods", "Deep Shade", "Nature"],
    min_age: 2, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1542273917363-b1817f69a2d?w=800&q=80"
  },
  {
    id: "scc-official-2",
    title: "Villa Montalvo",
    description: "Historic estate with beautifully manicured gardens and quiet trails.",
    category: "Park", city: "Saratoga",
    location_address: "15400 Montalvo Rd., Saratoga, CA 95070",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Villa+Montalvo+Saratoga",
    lat: 37.2457, lng: -122.0324,
    tags: ["Gardens", "Historic", "Quiet"],
    min_age: 1, max_age: 12,
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
  },

  // --- CITY PARKS (Hand-Curated Real Data) ---
  {
    id: 'sn-1', title: 'Seven Seas Park', description: 'Massive pirate-themed playground with a dedicated fenced toddler area and a large splash pad.',
    category: 'Park', city: 'Sunnyvale', location_address: '1010 Morse Ave, Sunnyvale, CA 94089',
    google_maps_url: createMapsUrl('Seven Seas Park', '1010 Morse Ave, Sunnyvale, CA 94089'),
    lat: 37.4042, lng: -122.0163, tags: ['Fenced', 'Splash Pad', 'Themed'],
    min_age: 1, max_age: 10, image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
  },
  {
    id: 'sn-2', title: 'Orchard Park', description: 'Fruit-themed park with unique play structures and a safe environment for younger children.',
    category: 'Park', city: 'Sunnyvale', location_address: 'Mathilda Ave, Sunnyvale, CA 94085',
    google_maps_url: createMapsUrl('Orchard Park', 'Sunnyvale, CA'),
    lat: 37.3950, lng: -122.0300, tags: ['Toddler Lot', 'Themed'],
    min_age: 1, max_age: 6, image_url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
  },
  {
    id: 'pa-1', title: 'Magical Bridge (Mitchell)', description: 'The original flagship inclusive playground. World class sensory play.',
    category: 'Park', city: 'Palo Alto', location_address: '600 E Meadow Dr, Palo Alto, CA 94306',
    google_maps_url: createMapsUrl('Magical Bridge Mitchell Park', 'Palo Alto, CA'),
    lat: 37.4200, lng: -122.1200, tags: ['Inclusive', 'Top Rated'],
    min_age: 0, max_age: 12, image_url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
  },
  {
    id: 'rw-1', title: 'Magical Bridge (Redwood City)', description: 'Massive inclusive playground at Red Morton Park with rubberized ground.',
    category: 'Park', city: 'Redwood City', location_address: '1120 Roosevelt Ave, Redwood City, CA 94061',
    google_maps_url: createMapsUrl('Magical Bridge Redwood City', 'Redwood City, CA'),
    lat: 37.4750, lng: -122.2350, tags: ['Inclusive', 'Rubber Surface'],
    min_age: 0, max_age: 12, image_url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
  },
  {
    id: 'rw-2', title: 'Stafford Park', description: 'Famous for its high splash pad and newly renovated gated tot lot.',
    category: 'Park', city: 'Redwood City', location_address: 'King St, Redwood City, CA 94062',
    google_maps_url: createMapsUrl('Stafford Park', 'Redwood City, CA'),
    lat: 37.4850, lng: -122.2450, tags: ['Splash Pad', 'Gated'],
    min_age: 1, max_age: 8, image_url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80',
  },
  {
    id: 'bk-1', title: 'Totland', description: 'Fully fenced Berkeley icon designed for toddlers 1-4. Very shaded.',
    category: 'Park', city: 'Berkeley', location_address: '1644 Virginia St, Berkeley, CA 94703',
    google_maps_url: createMapsUrl('Totland Berkeley', 'Berkeley, CA'),
    lat: 37.8765, lng: -122.2789, tags: ['Fully Fenced', 'Toddler Only'],
    min_age: 1, max_age: 4, image_url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80',
  },
  {
    id: 'sf-3', title: 'Koret Children’s Quarter', description: 'Historic park in GG Park with a 1914 carousel and huge sand areas.',
    category: 'Park', city: 'San Francisco', location_address: 'MLK Jr Dr, San Francisco, CA 94117',
    google_maps_url: createMapsUrl('Koret Children’s Quarter', 'San Francisco, CA'),
    lat: 37.7670, lng: -122.4650, tags: ['Carousel', 'Historic'],
    min_age: 1, max_age: 12, image_url: 'https://images.unsplash.com/photo-1533577116850-9ac6608ff28e?w=800&q=80',
  },
];

export const ZIP_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "95014": { lat: 37.3230, lng: -122.0322 },
  "94087": { lat: 37.3489, lng: -122.0308 },
  "94089": { lat: 37.4042, lng: -122.0163 },
  "95120": { lat: 37.2400, lng: -121.8700 },
  "95032": { lat: 37.2300, lng: -121.9500 },
  "94061": { lat: 37.4700, lng: -122.2300 },
  "94703": { lat: 37.8700, lng: -122.2700 },
  "94117": { lat: 37.7670, lng: -122.4650 },
  "95035": { lat: 37.4450, lng: -121.8500 }, // Milpitas
};
