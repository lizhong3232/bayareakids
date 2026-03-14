import { MapPin, Baby, Users, ExternalLink } from "lucide-react";
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
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-card/50">
      {activity.image_url && (
        <div className="h-40 w-full overflow-hidden bg-muted">
          <img
            src={activity.image_url}
            alt={activity.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
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
        <CardTitle className="text-xl font-bold leading-tight">{activity.title}</CardTitle>
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
        <div className="flex items-center text-primary font-semibold text-sm">
          <Users className="w-4 h-4 mr-1.5" />
          <span>{checkInCount} parents going</span>
        </div>
        <Button size="sm" className="rounded-full px-4 font-semibold shadow-sm">
          Check-in
        </Button>
      </CardFooter>
    </Card>
  );
}
