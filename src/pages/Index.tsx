import { useState, useCallback, useRef } from "react";
import { Recycle, Search, LocateFixed } from "lucide-react";
import { collectionPoints, CollectionPoint } from "@/data/collectionPoints";
import PointCard from "@/components/PointCard";
import MapView from "@/components/MapView";
import InfoCards from "@/components/InfoCards";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [flyTo, setFlyTo] = useState<CollectionPoint | null>(null);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [locating, setLocating] = useState(false);

  const filtered = collectionPoints.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const findNearest = useCallback(() => {
    if (!navigator.geolocation) {
      toast({ title: "Erro", description: "Seu navegador não suporta geolocalização.", variant: "destructive" });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let nearest: CollectionPoint | null = null;
        let minDist = Infinity;
        collectionPoints.forEach((p) => {
          const d = Math.hypot(p.lat - latitude, p.lng - longitude);
          if (d < minDist) { minDist = d; nearest = p; }
        });
        if (nearest) {
          const pt = nearest as CollectionPoint;
          setActiveId(pt.id);
          setFlyTo(pt);
          setOpenId(pt.id);
          cardRefs.current[pt.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
          toast({ title: "Ponto mais próximo", description: pt.name });
        }
        setLocating(false);
      },
      () => {
        toast({ title: "Erro", description: "Não foi possível obter sua localização.", variant: "destructive" });
        setLocating(false);
      }
    );
  }, []);

  const handleCardToggle = useCallback((point: CollectionPoint) => {
    setActiveId(point.id);
    setFlyTo(point);
    setOpenId((prev) => (prev === point.id ? null : point.id));
  }, []);

  const handleMarkerClick = useCallback((id: string) => {
    setActiveId(id);
    setOpenId(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Recycle className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">
              EcoResende
            </h1>
            <p className="text-xs text-muted-foreground">Pontos de coleta e reciclagem</p>
          </div>
        </div>
        <Button onClick={findNearest} disabled={locating} size="sm" className="gap-2">
          <LocateFixed className="h-4 w-4" />
          <span className="hidden sm:inline">{locating ? "Localizando..." : "Verificar ponto mais perto de você"}</span>
          <span className="sm:hidden">{locating ? "..." : "Mais perto"}</span>
        </Button>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar / List */}
        <aside className="order-2 md:order-1 flex flex-col w-full md:w-[380px] lg:w-[420px] border-r border-border bg-background overflow-hidden flex-1 md:flex-none">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar ponto de coleta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nenhum ponto encontrado.
              </p>
            )}
            {filtered.map((point) => (
              <div
                key={point.id}
                ref={(el) => { cardRefs.current[point.id] = el; }}
              >
                <PointCard
                  point={point}
                  isActive={activeId === point.id}
                  isOpen={openId === point.id}
                  onToggle={() => handleCardToggle(point)}
                />
              </div>
            ))}

            {/* Dicas educativas */}
            <div className="pt-3 border-t border-border mt-3">
              <InfoCards />
            </div>
          </div>

          <div className="border-t border-border px-3 py-2 text-center text-xs text-muted-foreground">
            {filtered.length} ponto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </div>
        </aside>

        {/* Map */}
        <main className="order-1 md:order-2 flex-1 min-h-[45vh] md:min-h-0 overflow-hidden">
          <div className="relative w-full h-full">
            <MapView
              points={filtered}
              activeId={activeId}
              onMarkerClick={handleMarkerClick}
              flyToPoint={flyTo}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
