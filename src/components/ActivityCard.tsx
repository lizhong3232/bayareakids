import { MapPin, Baby, Users, ExternalLink, Share2, Check, UserPlus, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/mock-data";

interface ActivityCardProps {
  activity: Activity;
  checkInCount?: number;
  distance?: number;
}

export function ActivityCard({ activity, checkInCount = 0, distance }: ActivityCardProps) {
  const [copied, setCopied] = useState(false);
  const [isGoing, setIsGoing] = useState(false);
  const [localCount, setLocalCount] = useState(checkInCount);

  // Load check-in status from localStorage on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem(`going-${activity.id}`);
    if (savedStatus === 'true') {
      setIsGoing(true);
      setLocalCount(checkInCount + 1);
    }
  }, [activity.id, checkInCount]);

  const handleCheckIn = () => {
    const newStatus = !isGoing;
    setIsGoing(newStatus);
    setLocalCount(prev => newStatus ? prev + 1 : prev - 1);
    localStorage.setItem(`going-${activity.id}`, String(newStatus));
  };

  const handleShare = async () => {
    const shareText = `🌟 ${activity.title}${activity.event_time ? `\n⏰ 时间：${activity.event_time}` : ''}\n${activity.description}\n\n📍 地址：${activity.location_address}\n🔗 地图：${activity.google_maps_url}\n\n—— 发现自 BayAreaKids`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Card className={`overflow-hidden border-2 transition-all duration-300 bg-card/50 ${isGoing ? 'border-primary shadow-lg scale-[1.02]' : 'border-transparent shadow-md hover:shadow-lg'}`}>
      {activity.image_url && (
        <div className="h-40 w-full overflow-hidden bg-muted relative">
          <img
            src={activity.image_url}
            alt={activity.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            <Badge className="bg-white/90 text-primary border-none shadow-sm backdrop-blur-sm text-[10px] font-bold">
              {activity.city}
            </Badge>
            {isGoing && (
              <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center shadow-lg">
                <Check className="w-3 h-3 mr-1" /> YOU ARE GOING
              </div>
            )}
          </div>
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start mb-1">
          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground font-medium">
            {activity.category}
          </Badge>
          <div className="flex items-center gap-2">
            {distance !== undefined && (
              <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/20 text-primary font-bold">
                {distance.toFixed(1)} mi
              </Badge>
            )}
            <div className="flex items-center text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
              <Baby className="w-3 h-3 mr-1" />
              <span>{activity.min_age}-{activity.max_age}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-bold leading-tight">{activity.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full shrink-0 text-muted-foreground hover:text-primary hover:bg-primary/5"
            onClick={handleShare}
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
          </Button>
        </div>
        
        {/* Event Time for Activities */}
        {activity.event_time && (
          <div className="flex items-center text-xs font-bold text-amber-600 mt-1 bg-amber-50 w-fit px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 mr-1" />
            {activity.event_time}
          </div>
        )}

        <a 
          href={activity.google_maps_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-xs text-muted-foreground mt-1 hover:text-primary transition-colors group"
        >
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate underline decoration-dotted">{activity.location_address}</span>
          <ExternalLink className="w-2 h-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="text-sm line-clamp-2 mt-2">
          {activity.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mt-3">
          {activity.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] py-0 px-1.5 border-primary/20 bg-primary/5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className={`flex items-center font-semibold text-sm transition-colors ${isGoing ? 'text-primary' : 'text-muted-foreground'}`}>
          <Users className="w-4 h-4 mr-1.5" />
          <span>{localCount} parents going</span>
        </div>
        <Button 
          size="sm" 
          onClick={handleCheckIn}
          variant={isGoing ? "default" : "outline"}
          className={`rounded-full px-4 font-semibold shadow-sm transition-all ${isGoing ? 'bg-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
        >
          {isGoing ? (
            <><Check className="w-4 h-4 mr-1" /> Going</>
          ) : (
            <><UserPlus className="w-4 h-4 mr-1" /> Check-in</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
