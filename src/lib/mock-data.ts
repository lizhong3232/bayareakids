export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'Park' | 'Library' | 'Indoor' | 'Hiking';
  location_address: string;
  google_maps_url: string;
  lat: number;
  lng: number;
  tags: string[];
  min_age: number;
  max_age: number;
  image_url?: string;
}

const createMapsUrl = (title: string, address: string) => 
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title} ${address}`)}`;

export const MOCK_ACTIVITIES: Activity[] = [
  // --- South Bay ---
  {
    id: '1',
    title: 'Seven Seas Park',
    description: 'The gold standard for toddlers. Features a dedicated fully-fenced play area, a large pirate ship, and a splash pad.',
    category: 'Park',
    location_address: '1010 Morse Ave, Sunnyvale, CA 94089',
    google_maps_url: createMapsUrl('Seven Seas Park', '1010 Morse Ave, Sunnyvale, CA 94089'),
    lat: 37.4042,
    lng: -122.0163,
    tags: ['Fenced', 'Shade Sails', 'Splash Pad', 'Restroom'],
    min_age: 1,
    max_age: 10,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
  },
  {
    id: '2',
    title: 'Greystone Park',
    description: 'Best for hot days! Incredible natural shade from mature redwood trees. Features a toddler-specific playground.',
    category: 'Park',
    location_address: '1145 Camden Ave, San Jose, CA 95120',
    google_maps_url: createMapsUrl('Greystone Park', '1145 Camden Ave, San Jose, CA 95120'),
    lat: 37.2345,
    lng: -121.8902,
    tags: ['High Shade', 'Nature', 'Toddler Lot', 'Quiet'],
    min_age: 0,
    max_age: 8,
    image_url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
  },
  {
    id: '4',
    title: 'Deer Hollow Farm',
    description: 'A flat 1-mile walk leading to a working farm. Kids can see goats, pigs, and cows. Very stroller friendly.',
    category: 'Hiking',
    location_address: '22500 Cristo Rey Dr, Cupertino, CA 95014',
    google_maps_url: createMapsUrl('Deer Hollow Farm', '22500 Cristo Rey Dr, Cupertino, CA 95014'),
    lat: 37.3234,
    lng: -122.0834,
    tags: ['Animals', 'Stroller Friendly', 'Paved', 'No Dogs'],
    min_age: 1,
    max_age: 12,
    image_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
  },
  {
    id: '20',
    title: 'Martial Cottle Park',
    description: 'A massive 180-acre historic farm in San Jose. Wide, flat paved paths perfect for strollers and seeing livestock.',
    category: 'Hiking',
    location_address: '5283 Snell Ave, San Jose, CA 95136',
    google_maps_url: createMapsUrl('Martial Cottle Park', '5283 Snell Ave, San Jose, CA 95136'),
    lat: 37.2650,
    lng: -121.8500,
    tags: ['Farm Life', 'Flat', 'Paved', 'Restroom'],
    min_age: 1,
    max_age: 12,
  },
  {
    id: '21',
    title: 'Los Gatos Creek Trail (Campbell)',
    description: 'Well-shaded paved path. Stop at Campbell Park playground or watch the ducks at the Perc Ponds.',
    category: 'Hiking',
    location_address: 'Campbell Park, Campbell, CA 95008',
    google_maps_url: createMapsUrl('Campbell Park Los Gatos Creek Trail', 'Campbell, CA'),
    lat: 37.2850,
    lng: -121.9350,
    tags: ['Shade', 'Water', 'Paved', 'Playground'],
    min_age: 1,
    max_age: 10,
  },

  // --- Peninsula ---
  {
    id: '5',
    title: 'Chickadee Trail (Huddart Park)',
    description: 'A 0.75-mile "all-access" loop designed for strollers. Deep redwood shade keeps it cool even in summer.',
    category: 'Hiking',
    location_address: '1100 Kings Mountain Rd, Woodside, CA 94062',
    google_maps_url: createMapsUrl('Chickadee Trail Huddart Park', '1100 Kings Mountain Rd, Woodside, CA 94062'),
    lat: 37.4412,
    lng: -122.2856,
    tags: ['Redwoods', 'Deep Shade', 'Stroller Friendly', 'Nature'],
    min_age: 1,
    max_age: 10,
  },
  {
    id: '22',
    title: 'Mori Point',
    description: 'A coastal gem with a flat boardwalk through ponds (look for frogs!) and stunning ocean views. Spring Poppies!',
    category: 'Hiking',
    location_address: 'Mori Point Rd, Pacifica, CA 94044',
    google_maps_url: createMapsUrl('Mori Point', 'Pacifica, CA'),
    lat: 37.6160,
    lng: -122.4930,
    tags: ['Ocean View', 'Boardwalk', 'Wildflowers', 'Frogs'],
    min_age: 2,
    max_age: 12,
  },
  {
    id: '23',
    title: 'Redwood Trail (Purisima)',
    description: 'A rare flat, paved 0.25-mile loop through giant redwoods. Perfect for a quick "forest bath" with a stroller.',
    category: 'Hiking',
    location_address: 'Redwood Trailhead Highway 35, Redwood City, CA',
    google_maps_url: createMapsUrl('Purisima Creek Redwood Trail', 'Highway 35, CA'),
    lat: 37.4520,
    lng: -122.3380,
    tags: ['Giant Redwoods', 'Flat', 'Paved Loop', 'Shade'],
    min_age: 1,
    max_age: 8,
  },
  {
    id: '24',
    title: 'Seal Point Park',
    description: 'Paved paths along the Bay with interesting wind-powered art sculptures. Great for plane watching.',
    category: 'Hiking',
    location_address: '1901 J Hart Fergusson Dr, San Mateo, CA 94401',
    google_maps_url: createMapsUrl('Seal Point Park', 'San Mateo, CA'),
    lat: 37.5850,
    lng: -122.2980,
    tags: ['Bay Trail', 'Sculptures', 'Paved', 'Dog Friendly'],
    min_age: 1,
    max_age: 12,
  },

  // --- East Bay ---
  {
    id: '13',
    title: 'Totland',
    description: 'A Berkeley institution designed specifically for ages 1-4. Fully fenced, large sandbox, and great shade.',
    category: 'Park',
    location_address: '1644 Virginia St, Berkeley, CA 94703',
    google_maps_url: createMapsUrl('Totland', '1644 Virginia St, Berkeley, CA 94703'),
    lat: 37.8765,
    lng: -122.2789,
    tags: ['Fully Fenced', 'Toddler Only', 'Shade', 'Sandbox'],
    min_age: 1,
    max_age: 4,
  },
  {
    id: '25',
    title: 'Jewel Lake (Tilden Park)',
    description: 'Start at the Little Farm to feed cows, then walk the flat path to Jewel Lake to find turtles and ducks.',
    category: 'Hiking',
    location_address: '600 Canon Dr, Berkeley, CA 94708',
    google_maps_url: createMapsUrl('Jewel Lake Tilden Park', 'Berkeley, CA'),
    lat: 37.8930,
    lng: -122.2680,
    tags: ['Turtles', 'Farm Animals', 'Boardwalk', 'Lake'],
    min_age: 1,
    max_age: 10,
  },
  {
    id: '26',
    title: 'Coyote Hills Marsh Walk',
    description: 'Wide paved and boardwalk paths through a bird-rich marsh. Visit the Nectar Garden for butterflies.',
    category: 'Hiking',
    location_address: '8000 Patterson Ranch Rd, Fremont, CA 94555',
    google_maps_url: createMapsUrl('Coyote Hills Visitor Center', 'Fremont, CA'),
    lat: 37.5500,
    lng: -122.0850,
    tags: ['Birds', 'Butterflies', 'Boardwalk', 'Paved'],
    min_age: 1,
    max_age: 12,
  },
  {
    id: '27',
    title: 'Lake Elizabeth Loop',
    description: 'A 2-mile flat paved loop around a lake with multiple playgrounds and views of Mission Peak.',
    category: 'Hiking',
    location_address: '40000 Paseo Padre Pkwy, Fremont, CA 94538',
    google_maps_url: createMapsUrl('Central Park Fremont Lake Elizabeth', 'Fremont, CA'),
    lat: 37.5520,
    lng: -121.9680,
    tags: ['Lake Loop', 'Multiple Playgrounds', 'Paved', 'Restroom'],
    min_age: 0,
    max_age: 12,
  },

  // --- San Francisco ---
  {
    id: '16',
    title: 'Mountain Lake Park',
    description: 'An enclosed toddler area with unique sensory equipment. Peacefully set next to a lake with mature trees.',
    category: 'Park',
    location_address: '12th Ave & Lake St, San Francisco, CA 94118',
    google_maps_url: createMapsUrl('Mountain Lake Park Playground', 'San Francisco, CA'),
    lat: 37.7876,
    lng: -122.4712,
    tags: ['Enclosed', 'Lake View', 'Shade', 'Quiet'],
    min_age: 1,
    max_age: 8,
  },
  {
    id: '28',
    title: 'Crissy Field Promenade',
    description: 'The ultimate SF walk. Flat, paved, with world-class views of the Golden Gate Bridge and sandy beaches.',
    category: 'Hiking',
    location_address: '1199 E Beach, San Francisco, CA 94129',
    google_maps_url: createMapsUrl('Crissy Field Center', 'San Francisco, CA'),
    lat: 37.8050,
    lng: -122.4650,
    tags: ['Bridge Views', 'Beach', 'Paved', 'Iconic'],
    min_age: 0,
    max_age: 12,
  },
  {
    id: '29',
    title: 'Stow Lake (Golden Gate Park)',
    description: 'A 1-mile flat paved loop around a lake with a waterfall, a stone bridge, and plenty of ducks and turtles.',
    category: 'Hiking',
    location_address: '50 Stow Lake Dr E, San Francisco, CA 94118',
    google_maps_url: createMapsUrl('Stow Lake Boathouse', 'San Francisco, CA'),
    lat: 37.7690,
    lng: -122.4760,
    tags: ['Waterfall', 'Ducks', 'Boats', 'Paved'],
    min_age: 1,
    max_age: 10,
  },
  
  // --- North Bay ---
  {
    id: '30',
    title: 'Blackie\'s Pasture',
    description: 'Named after a beloved horse. This flat paved path along the water in Tiburon is perfect for strollers.',
    category: 'Hiking',
    location_address: 'Blackie\'s Pasture, Tiburon, CA 94920',
    google_maps_url: createMapsUrl('Blackie\'s Pasture', 'Tiburon, CA'),
    lat: 37.8880,
    lng: -122.4750,
    tags: ['Waterfront', 'Horse Statue', 'Flat', 'Paved'],
    min_age: 1,
    max_age: 10,
  },
  {
    id: '31',
    title: 'Napa River Trail',
    description: 'Wide, flat paved trail running along the river. Great for a stroll after a visit to the Oxbow Public Market.',
    category: 'Hiking',
    location_address: 'Napa River Trail, Napa, CA 94559',
    google_maps_url: createMapsUrl('Napa River Trail Oxbow', 'Napa, CA'),
    lat: 38.3000,
    lng: -122.2850,
    tags: ['River View', 'Paved', 'Near Market', 'Flat'],
    min_age: 1,
    max_age: 12,
  },
];

export const ZIP_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "95014": { lat: 37.3230, lng: -122.0322 },
  "94087": { lat: 37.3489, lng: -122.0308 },
  "94089": { lat: 37.4042, lng: -122.0163 },
  "95136": { lat: 37.2650, lng: -121.8500 }, // Martial Cottle
  "95008": { lat: 37.2850, lng: -121.9350 }, // Campbell
  "95032": { lat: 37.2300, lng: -121.9500 },
  "94062": { lat: 37.4500, lng: -122.2500 },
  "94044": { lat: 37.6100, lng: -122.4800 }, // Pacifica
  "94401": { lat: 37.5800, lng: -122.3000 }, // San Mateo
  "94703": { lat: 37.8700, lng: -122.2700 },
  "94708": { lat: 37.8900, lng: -122.2600 }, // Berkeley Hills
  "94555": { lat: 37.5500, lng: -122.0800 }, // Fremont
  "94538": { lat: 37.5500, lng: -121.9600 }, // Fremont
  "94129": { lat: 37.8000, lng: -122.4600 }, // Presidio
  "94118": { lat: 37.7800, lng: -122.4600 },
  "94920": { lat: 37.8800, lng: -122.4700 }, // Tiburon
  "94559": { lat: 38.3000, lng: -122.2800 }, // Napa
};
