"use client";

import { useState, useMemo } from "react";
import { MOCK_ACTIVITIES, Activity, ZIP_COORDINATES } from "@/lib/mock-data";
import { ActivityCard } from "@/components/ActivityCard";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Sun, Trees, BookOpen, Users, Compass, MapPin } from "lucide-react";

// Haversine formula to calculate distance in miles
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeCity, setActiveCity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [zipCode, setZipCode] = useState("");

  const userCoords = useMemo(() => {
    return ZIP_COORDINATES[zipCode] || null;
  }, [zipCode]);

  // Extract unique cities for the filter
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(MOCK_ACTIVITIES.map(a => a.city)));
    return ["All", ...uniqueCities.sort()];
  }, []);

  const filteredAndSortedActivities = useMemo(() => {
    let result = MOCK_ACTIVITIES.map(activity => {
      let distance = undefined;
      if (userCoords) {
        distance = calculateDistance(userCoords.lat, userCoords.lng, activity.lat, activity.lng);
      }
      return { ...activity, distance };
    });

    // 1. Filter by Category
    result = result.filter((activity) => {
      const matchesCategory = activeCategory === "All" || 
                             (activeCategory === "Shade" ? activity.tags.includes("High Shade") || activity.tags.includes("Shade Sails") : activity.category === activeCategory);
      return matchesCategory;
    });

    // 2. Filter by City
    if (activeCity !== "All") {
      result = result.filter(activity => activity.city === activeCity);
    }

    // 3. Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(activity => 
        activity.title.toLowerCase().includes(q) ||
        activity.description.toLowerCase().includes(q) ||
        activity.city.toLowerCase().includes(q) ||
        activity.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 4. Sort by distance if available
    if (userCoords) {
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return result;
  }, [activeCategory, activeCity, searchQuery, userCoords]);

  const categories = [
    { name: "All", icon: null },
    { name: "Park", icon: <Trees className="w-3 h-3 mr-1" /> },
    { name: "Hiking", icon: <Compass className="w-3 h-3 mr-1" /> },
    { name: "Library", icon: <BookOpen className="w-3 h-3 mr-1" /> },
  ];

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-secondary/20 px-6 py-4 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center tracking-tight">
              <Trees className="w-6 h-6 mr-2 text-primary" />
              BayAreaKids
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Activity Scout & Playdates</p>
          </div>
          
          <div className="flex items-center bg-secondary/30 rounded-full px-3 py-1.5 border border-transparent focus-within:border-primary/20 transition-all">
            <MapPin className="w-3 h-3 text-primary mr-1.5" />
            <input 
              type="text" 
              maxLength={5}
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
              className="bg-transparent text-xs font-bold w-14 outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search parks, cities, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary/30 rounded-full text-sm border-transparent focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <Badge
                key={cat.name}
                variant={activeCategory === cat.name ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.name)}
                className={`rounded-full px-4 py-1 cursor-pointer whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                    ? "bg-primary text-white shadow-sm border-none" 
                    : "bg-white border-secondary/50 text-muted-foreground hover:bg-secondary/20"
                }`}
              >
                {cat.icon}
                {cat.name === "Park" ? "Parks" : cat.name === "Library" ? "Libraries" : cat.name}
              </Badge>
            ))}
          </div>

          {/* City Filter (New) */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center pr-1">City:</span>
            {cities.map((city) => (
              <Badge
                key={city}
                variant={activeCity === city ? "secondary" : "outline"}
                onClick={() => setActiveCity(city)}
                className={`rounded-full px-3 py-0.5 text-[10px] cursor-pointer whitespace-nowrap transition-all ${
                  activeCity === city 
                    ? "bg-secondary text-secondary-foreground border-none" 
                    : "bg-white border-secondary/30 text-muted-foreground"
                }`}
              >
                {city}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Content Feed */}
      <section className="px-6 py-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground/90 leading-tight">
              {activeCategory === "All" ? "Recommended " : `${activeCategory} `}
              {activeCity !== "All" && <span className="text-muted-foreground font-medium">in {activeCity}</span>}
              <br />
              <span className="text-primary underline decoration-secondary decoration-4 underline-offset-4 text-lg">Scouted for Today</span>
            </h2>
          </div>
        </div>

        {filteredAndSortedActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={{...activity, checkInCount: (parseInt(activity.id) * 7) % 12 + 1}} // Fixed deterministic count
                checkInCount={(parseInt(activity.id) * 7) % 12 + 1}
                distance={activity.distance}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No matches found in {activeCity}.</p>
            <button 
              onClick={() => {setActiveCategory("All"); setActiveCity("All"); setSearchQuery(""); setZipCode("");}}
              className="text-primary font-bold mt-2 underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-secondary/30 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl z-20">
        <div className="flex flex-col items-center gap-1 text-primary">
          <Trees className="w-6 h-6" />
          <span className="text-[10px] font-bold">Scout</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground opacity-50">
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-bold">Social</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground opacity-50">
          <Badge className="p-0 h-6 w-6 flex items-center justify-center rounded-full bg-secondary/30 border-none">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </Badge>
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </nav>
    </main>
  );
}
