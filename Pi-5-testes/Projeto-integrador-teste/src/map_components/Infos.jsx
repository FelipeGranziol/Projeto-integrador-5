import { useEffect, useState } from "react";
import VitalRates from "./VitalRates";

const Infos = ({ city }) => {
  const [cityData, setCityData] = useState(null);

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
      <div className="vital-rates-container">
        {cityData && (
          <>
            <VitalRates
              data={cityData?.vital_rates}
              totalData={cityData?.vital_rates_total}
            />
            {/* <h3>Dados de 2014 - 2024</h3>
          <span>Natalidade: {cityData["Nascim_p/resid.mãe"]}</span>
          <span>Mortalidade: {cityData["Óbitos_p/Residênc"]}</span> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Infos;
