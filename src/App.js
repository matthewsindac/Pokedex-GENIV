import React, { useState } from "react";
import Api from "./component/api";
import Banner from "./component/banner";

function App() {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [apiDataLoaded, setApiDataLoaded] = useState(false);

  const handleClick = () => {
    setIsApiLoaded(!isApiLoaded);
  };

  const handleApiLoad = () => {
    setApiDataLoaded(true);
  };

  return (
    <>
    <div>
      <Banner/>
    </div>
    
      <div id="load">
        <button onClick={handleClick}>
          {isApiLoaded ? "Hide" : "Load PokeDex"}
        </button>
        {isApiLoaded && !apiDataLoaded ? <div>Loading...</div> : null}
        {isApiLoaded ? (
          <Api isLoading={isApiLoaded} onApiLoad={handleApiLoad} />
        ) : null}
      </div>
    </>
  );
}


export default App;
