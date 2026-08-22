import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { CollectionPoint } from "@/data/collectionPoints";

const createIcon = (active: boolean) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${active ? 36 : 28}px;
      height: ${active ? 36 : 28}px;
      background: ${active ? "hsl(var(--marker-active))" : "hsl(var(--marker))"};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.2s;
      display: flex; align-items: center; justify-content: center;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>`,
    iconSize: [active ? 36 : 28, active ? 36 : 28],
    iconAnchor: [active ? 18 : 14, active ? 36 : 28],
  });

interface MapViewProps {
  points: CollectionPoint[];
  activeId: string | null;
  onMarkerClick: (id: string) => void;
  flyToPoint: CollectionPoint | null;
}

const MapView = ({ points, activeId, onMarkerClick, flyToPoint }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([-22.4686, -44.4469], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    // Force invalidate after layout settles
    setTimeout(() => map.invalidateSize(), 100);
    setTimeout(() => map.invalidateSize(), 500);

    // Observe container resize to fix tile rendering
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Manage markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add new markers
    points.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], {
        icon: createIcon(activeId === point.id),
      })
        .addTo(map)
        .bindPopup(`<strong>${point.name}</strong><br/><span style="font-size:12px">${point.address}</span>`);

      marker.on("click", () => onMarkerClick(point.id));
      markersRef.current[point.id] = marker;
    });
  }, [points, activeId, onMarkerClick]);

  // Fly to point
  useEffect(() => {
    if (flyToPoint && mapRef.current) {
      mapRef.current.flyTo([flyToPoint.lat, flyToPoint.lng], 16, { duration: 0.8 });
    }
  }, [flyToPoint]);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default MapView;
