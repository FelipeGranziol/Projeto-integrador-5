import { useEffect, useState } from "react";
import VitalRates from "./VitalRates";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Infos = ({ city }) => {
  const [cityData, setCityData] = useState(null);
  const [activeTab, setActiveTab] = useState("vitais");
  const tabs = [
    {
      id: "vitais",
      label: "Indicadores vitias",
      comp: (
        <VitalRates
          data={cityData?.vital_rates}
          totalData={cityData?.vital_rates_total}
        />
      ),
    },
    {
      id: "financeiro",
      label: "Financeiro",
      comp: (
        <VitalRates
          data={cityData?.vital_rates}
          totalData={cityData?.vital_rates_total}
        />
      ),
    },
    {
      id: "saude",
      label: "Saúde",
      comp: (
        <VitalRates
          data={cityData?.vital_rates}
          totalData={cityData?.vital_rates_total}
        />
      ),
    },
    {
      id: "educacao",
      label: "Educação",
      comp: (
        <VitalRates
          data={cityData?.vital_rates}
          totalData={cityData?.vital_rates_total}
        />
      ),
    },
  ];
  const getData = async (c) => {
    const response = await fetch(`http://localhost:8000/api/city-data/${c}`);
    const data = await response.json();
    setCityData(data);
  };

  useEffect(() => {
    const cityName = getCityDefaultName(city);
    getData(cityName);
  }, [city]);

  function getCityDefaultName(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }
  return (
    <div className="status-container">
      <h2>{city}</h2>
      <p>Painel de Indicadores Municipais · 2014-2024</p>
      <div className="infos-tabs">
        {tabs.map((t) => (
          <Tab
            key={t.id}
            label={t.label}
            active={activeTab === t.id}
            onClick={() => setActiveTab(t)}
          />
        ))}
      </div>
      <br></br>

      <div className="tabs-content">
        {activeTab.id === "vitais" && (
          <VitalRates
            data={cityData?.vital_rates}
            totalData={cityData?.vital_rates_total}
          />
        )}
        {activeTab.id === "financeiro" && <span>oiiii</span>}
        {activeTab.id === "saude" && <span>oiiii</span>}
        {activeTab.id === "educacao" && <span>oiiii</span>}
      </div>
    </div>
    // </div>
  );
};

export default Infos;
