import { useState } from "react";
import styles from "./App.module.scss";
import SubmitForm from "./components/SubmitForm";
import GameMap from "./components/GameMap";

function App() {
  const [isMap, setIsMap] = useState(false);
  const [gameResult, setGameResult] = useState({});
  const [gridSize, setGridSize] = useState();
  
  const toggleHandler = () => {
    setIsMap((prevState) => (prevState = !prevState));
  };

  return (
    <div className={styles.PageWrapper}>
      {!isMap && (
        <SubmitForm
          toggleHandler={toggleHandler}
          setGameResult={setGameResult}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
      )}
      {isMap && (
        <GameMap
          gameResult={gameResult}
          gridSize={gridSize}
          setIsMap={setIsMap}
          toggleHandler={toggleHandler}
        />
      )}
    </div>
  );
}

export default App;
