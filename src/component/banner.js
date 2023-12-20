import React from "react";
import '../style/banner.css';

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-content" style={{ backgroundColor: "#ccc", padding: "20px" }}>
        <h1>The Generation IV PokeDex by Matthew Sindac</h1>
      </div>
    </div>
  );
}
