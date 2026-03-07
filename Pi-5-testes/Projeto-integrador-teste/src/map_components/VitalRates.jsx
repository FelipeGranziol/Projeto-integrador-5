import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

const VitalRates = ({ data, totalData }) => {
  const totalArray = [{ ...totalData, ano: "Total" }];
  return <VitalRatesGraphs data={data} totalArray={totalArray} />;
};

const VitalRatesGraphs = ({ data, totalArray }) => {
  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <ResponsiveContainer width="90%" aspect={2}>
        <LineChart data={data} margin={{ left: 0, right: 20 }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="ano" />
          <YAxis />
          <Line
            connectNulls
            type="monotone"
            dataKey="Óbitos_p/Ocorrênc"
            stroke="#e74c3c"
            dot={{ fill: "#fff" }}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="Nascim_p/ocorrênc"
            stroke="#3498db"
            dot={{ fill: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="90%" aspect={3}>
        <BarChart
          data={totalArray}
          margin={{ left: 0, right: 40 }}
          layout="vertical"
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="ano" width={50} />
          <Legend />
          <Bar dataKey="Óbitos_p/Ocorrênc" name="Óbitos" fill="#e74c3c">
            <LabelList dataKey="Óbitos_p/Ocorrênc" position="right" />
          </Bar>
          <Bar dataKey="Nascim_p/ocorrênc" name="Nascimentos" fill="#3498db">
            <LabelList dataKey="Nascim_p/ocorrênc" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default VitalRates;
