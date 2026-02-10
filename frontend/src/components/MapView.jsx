import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Fix marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Handles resize + recenter */
function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.setView(position, 15);

    requestAnimationFrame(() => {
      map.invalidateSize(true);
    });
  }, [position]);

  return null;
}

export default function MapView() {
  const [position, setPosition] = useState(null);

  /* Get user's real location */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log("Location error:", err.message);
        // fallback only if permission denied
        setPosition([28.6139, 77.209]); // Delhi
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (!position) return null; // wait for location

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      zoomControl={false}
      touchZoom={true}
      dragging={true}
      doubleClickZoom={true}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} />
      <MapController position={position} />
    </MapContainer>
  );
}