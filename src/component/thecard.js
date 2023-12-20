import React from "react";
import "../style/thecard.css";

export default function Card({ name, imageUrl, types, showTypes }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} />
      {showTypes && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}









