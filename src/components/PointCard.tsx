import { CollectionPoint } from "@/data/collectionPoints";
import { MapPin, Clock, Navigation, ChevronDown, HandCoins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PointCardProps {
  point: CollectionPoint;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const PointCard = ({ point, isActive, isOpen, onToggle }: PointCardProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-primary/40 overflow-hidden",
        isActive && "point-card-active shadow-md"
      )}
    >
      {/* Collapsed header — always visible */}
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-card-foreground leading-tight">{point.name}</h3>
              {point.paga && (
                <Badge variant="outline" className="text-xs border-green-600 text-green-600 shrink-0">
                  <HandCoins className="h-3 w-3 mr-0.5" />Compra material
                </Badge>
              )}
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </div>
            <p className="mt-1 text-sm text-muted-foreground truncate">{point.address}</p>
            <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{point.hours}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {point.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-medium bg-secondary text-secondary-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded section */}
      {isOpen && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>

          {point.conditions && (
            <p className="text-xs text-accent-foreground bg-accent/10 rounded-md p-2.5 leading-relaxed">
              ⚠️ {point.conditions}
            </p>
          )}

          <Button
            size="sm"
            className="w-full gap-2"
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <Navigation className="h-4 w-4" />
            Ir até o local
          </Button>

          {point.image && (
            <div className="overflow-hidden rounded-lg border border-border">
              <img
                src={point.image}
                alt={`Fachada de ${point.name}`}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Mapa de ${point.name}`}
              src={`https://maps.google.com/maps?q=${point.lat},${point.lng}&z=16&output=embed`}
              width="100%"
              height="160"
              className="block"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PointCard;
