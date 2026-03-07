import React from "react";

const VitalRatesCard = ({ data, title, color }) => {
  return (
    <div className="vital-rates-card">
      <div
        style={{
          display: "flex",
          height: "35%",
          borderBottom: `3px solid ${color} `,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data}
      </div>
    </div>
  );
};

export default VitalRatesCard;
