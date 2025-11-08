import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface EcoMapProps {
  startPoint?: [number, number];
  endPoint?: [number, number];
  onMapReady?: (map: any) => void;
}

export default function EcoMap({ startPoint, endPoint, onMapReady }: EcoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
    onMapReady?.(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    const L = (window as any).L;
    if (!L) return;

    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    if (startPoint) {
      const greenIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.marker(startPoint, { icon: greenIcon }).addTo(mapInstanceRef.current)
        .bindPopup("Start Point");
    }

    if (endPoint) {
      const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.marker(endPoint, { icon: redIcon }).addTo(mapInstanceRef.current)
        .bindPopup("End Point");
    }

    if (startPoint && endPoint) {
      L.polyline([startPoint, endPoint], {
        color: 'hsl(var(--primary))',
        weight: 4,
        opacity: 0.7,
      }).addTo(mapInstanceRef.current);

      const bounds = L.latLngBounds([startPoint, endPoint]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [startPoint, endPoint]);

  return (
    <Card className="overflow-hidden" data-testid="map-eco-route">
      <div ref={mapRef} className="h-[500px] w-full" />
    </Card>
  );
}
