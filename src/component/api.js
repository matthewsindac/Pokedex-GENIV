import React, { useState, useEffect } from "react";
import Card from "./thecard";

export default function Api({ isLoading, onApiLoad }) {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showTypes, setShowTypes] = useState(true);

  const getAPIData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=107&offset=386`;
    const response = await fetch(url);
    const data = await response.json();

    const pokemonDataPromises = data.results.map(async (result) => {
      const pokemonResponse = await fetch(result.url);
      const pokemonData = await pokemonResponse.json();
      const imageUrl = pokemonData.sprites.front_default;
      const types = pokemonData.types;
      const show = showTypes;
      return { name: pokemonData.name, imageUrl, types, show };
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    const cards = pokemonData.map((element) => (
      <div style={{ margin: "10px" }}>
        <Card
          key={element.name}
          name={element.name.charAt(0).toUpperCase() + element.name.slice(1)}
          imageUrl={element.imageUrl}
          types={element.types}
          showTypes={element.show}
        />
      </div>
    ));
    setPokemonCards(cards);
    onApiLoad();
  };

  useEffect(() => {
    getAPIData();
  }, [pageNumber, showTypes]);

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleShowTypes = () => {
    setShowTypes((prevShowTypes) => !prevShowTypes);
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevPage} disabled={pageNumber === 1}>
          Prev
        </button>
        <button onClick={handleNextPage} disabled={pageNumber * 10 >= 107}>
          Next
        </button>
        <button onClick={handleShowTypes}>
          {showTypes ? "Hide Types" : "Show Types"}
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            maxWidth: "1100px",
          }}
        >
          {pokemonCards.slice((pageNumber - 1) * 10, pageNumber * 10)}
        </div>
      </div>
    </div>
  );
}
