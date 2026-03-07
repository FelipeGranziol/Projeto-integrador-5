import { useState, useEffect, useRef } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import jsonData from "./cities.json";
import Infos from "./Infos";
function Map() {
  // Data
  const cities = jsonData;
  const citiesNames = cities.features.map((c) => c.properties.name);
  //States
  const [centers, setCenters] = useState([]);
  const [actual, setActual] = useState(null);

  //Refs
  const mapRef = useRef(null);
  const layersRef = useRef({});

  useEffect(() => {
    if (mapRef.current) return;
    const c = [];
    const container = L.DomUtil.get("map");
    if (container._leaflet_id) return;
    mapRef.current = L.map("map", {
      center: [-22, -48],
      zoom: 7,
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution: '© <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      },
    ).addTo(mapRef.current);
    L.geoJSON(cities, {
      style: {
        weight: 0.5,
        color: "#61fff2",
        opacity: 0.5,
        fillOpacity: 0.1,
      },
      onEachFeature: (feature, layer) => {
        layersRef.current[feature.properties.name] = layer;
        if (feature.properties?.name) {
          layer.bindTooltip(feature.properties.name, {
            permanent: false, // sempre visível
            direction: "center", // centralizado no polígono
            className: "city-label", // classe CSS customizável
          });
        }
        const { lat, lng } = layer.getBounds().getCenter();
        c.push({
          name: feature.properties.name,
          center: [lat, lng - 0.2],
        });
      },
    }).addTo(mapRef.current);
    setCenters(c);

    return () => {
      (mapRef.current.remove(), (mapRef.current = null));
    };
  }, []);

  const showCity = (cityName) => {
    const city = centers.find((c) => c.name === cityName);
    if (actual && layersRef.current[actual]) {
      layersRef.current[actual].setStyle({
        weight: 0.5,
        color: "#61fff2",
      });
    }

    if (layersRef.current[cityName]) {
      layersRef.current[cityName].setStyle({
        weight: 2,
        color: "#ff0000",
      });
    }
    setActual(cityName);
    mapRef.current?.flyTo(city.center, 10.5);
  };
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        {actual && <Infos city={actual} />}
        <div className="select-container">
          <select
            onChange={(e) => showCity(e.target.value)}
            defaultValue={null}
          >
            {citiesNames.map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
        <div id="map" style={{ height: "100vh", width: "100%" }} />
      </div>
    </>
  );
}

export default Map;
