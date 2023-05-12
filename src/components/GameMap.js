import styles from "./GameMap.module.scss";

function GameMap({ gameResult, gridSize, toggleHandler }) {
  const { zombies, creatures } = gameResult;
  const cells = new Array(gridSize * gridSize).fill("empty");
  zombies.forEach((zombie) => {
    cells[zombie.y * gridSize + zombie.x] = "zombie";
  });

  creatures.forEach((creature) => {
    cells[creature.y * gridSize + creature.x] = "creature";
  });

  return (
    <>
      <div className={styles.returnContainer} onClick={toggleHandler}>
        {"<- 返回"}
      </div>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {cells.map((cell, index) => {
          if (cell === "zombie") {
            return (
              <div className={styles.cell}>
                <img src="/images/creeper.png" alt="zombie" />
              </div>
            );
          } else if (cell === "creature") {
            return (
              <div className={styles.cell}>
                <img src="/images/creature.png" alt="creature" />
              </div>
            );
          }
          return (
            <div className={`${styles.cell} ${styles.empty}`} key={index} />
          );
        })}
      </div>
    </>
  );
}

export default GameMap;
