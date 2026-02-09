import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  const center = [28.6139, 77.2090]; // demo

  return (
    <MapContainer
  center={center}
  zoom={14}
  zoomControl={false}     // removes + / −
  scrollWheelZoom={true} // mouse wheel (laptop)
  touchZoom={true}       // pinch zoom (mobile)
  dragging={true}        // pan map
  doubleClickZoom={true} // double-click zoom
  style={{ height: "100%", width: "100%" }}
>
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} />
    </MapContainer>
  );
}

