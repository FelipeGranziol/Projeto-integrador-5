import { useState } from "react";
import { LineChart, BarChart } from "@mui/x-charts";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import VitalRatesCard from "./VitalRatesCard";

const VitalRates = ({ data, totalData }) => {
  console.log("caiu aqui");
  const totalArray = [{ ...totalData, ano: "Total" }];
  return <VitalRatesGraphs data={data} totalArray={totalArray} />;
};

const VitalRatesGraphs = ({ data, totalArray, years }) => {
  const anos = data.map((d) => d.ano);
  const obitos = data.map((d) => d["Óbitos_p/Ocorrênc"]);
  const nascimentos = data.map((d) => d["Nascim_p/ocorrênc"]);

  const anosTotal = totalArray.map((d) => d.ano);
  const obitosTotal = totalArray.map((d) => d["Óbitos_p/Ocorrênc"]);
  const nascimentosTotal = totalArray.map((d) => d["Nascim_p/ocorrênc"]);

  return (
    <>
      <div className="vital-rates-grid">
        <VitalRatesCard
          title={"Total de nascimentos"}
          data={nascimentosTotal}
          color={"#3498db"}
        />
        <VitalRatesCard
          title={"Total de óbitos"}
          data={obitosTotal}
          color={"#e74c3c"}
        />
        <VitalRatesCard
          title={"Saldo"}
          data={nascimentosTotal - obitosTotal}
          color={"#ffffff"}
        />
      </div>
      <br></br>
      <div className="vital-rates-chart">
        <span style={{ fontSize: "16px", fontWeight: 600 }}>
          Evolução anual
        </span>
        <LineChart
          slotProps={{
            legend: {
              direction: "vertical",
              position: {
                vertical: "middle",
                horizontal: "center",
              },
              toggleVisibilityOnClick: true,
            },
          }}
          xAxis={[{ scaleType: "point", data: anos }]}
          series={[
            {
              data: obitos,
              label: "Óbitos",
              color: "#e74c3c",
              connectNulls: true,
            },
            {
              data: nascimentos,
              label: "Nascimentos",
              color: "#3498db",
              connectNulls: true,
            },
          ]}
          width={400}
          height={180}
          sx={{ width: "90%" }}
        />
      </div>
    </>
  );
};

export default VitalRates;
