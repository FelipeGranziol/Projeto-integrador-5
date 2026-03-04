import { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import jsonData from "./cities.json";
function App() {
  const cities = jsonData;

  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (container._leaflet_id) return;
    const map = L.map("map", {
      center: [-22, -48],
      zoom: 7,
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution: '© <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      },
    ).addTo(map);
    var myLayer = L.geoJSON(cities, {
      onEachFeature: (feature, layer) => {
        if (feature.properties?.name) {
          layer.bindTooltip(feature.properties.name, {
            permanent: true, // sempre visível
            direction: "center", // centralizado no polígono
            className: "city-label", // classe CSS customizável
          });
        }
      },
    }).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </>
  );
}

export default App;
