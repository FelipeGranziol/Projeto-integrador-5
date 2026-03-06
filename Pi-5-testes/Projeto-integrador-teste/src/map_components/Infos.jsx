import { useEffect, useState } from "react";

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
      {cityData && (
        <>
          <h3>Dados de 2014 - 2024</h3>
          <span>Natalidade: {cityData["Nascim_p/resid.mãe"]}</span>
          <span>Mortalidade: {cityData["Óbitos_p/Residênc"]}</span>
        </>
      )}
    </div>
  );
};

export default Infos;
