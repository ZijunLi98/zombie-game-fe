import { useState } from "react";
import styles from "./SubmitForm.module.scss";
import { getGameResult } from "../api/game";
import InputField from "./InputField";

function SubmitForm({ toggleHandler, setGameResult, gridSize, setGridSize }) {
  const [creatures, setCreatures] = useState([{ x: "", y: "" }]);
  const [zombie, setZombie] = useState({ x: "", y: "" });
  const [commands, setCommands] = useState("");

  const changeCreaturesHandler = (i, e) => {
    const newFormValues = [...creatures];
    if (!e.target.value) {
      newFormValues[e.target.name] = "";
    } else {
      newFormValues[i][e.target.name] = +e.target.value;
    }
    setCreatures(newFormValues);
  };

  const changeZombieHandler = (e) => {
    const newFormValues = { ...zombie };
    if (!e.target.value) {
      newFormValues[e.target.name] = "";
    } else {
      newFormValues[e.target.name] = +e.target.value;
    }

    setZombie(newFormValues);
  };

  const addNewCreatureHandler = () => {
    setCreatures([...creatures, { x: "", y: "" }]);
  };

  const removeCreatureHandler = (i) => {
    const newFormValues = [...creatures];
    newFormValues.splice(i, 1);
    setCreatures(newFormValues);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      gridSize: +gridSize,
      creatures,
      zombie,
      commands,
    };
    const response = await getGameResult(data);
    setGameResult(response);
    toggleHandler();
  };

  const commandsHandler = async (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^udlr]/gi, "").toUpperCase();
    setCommands(filteredValue);
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h1>Build the world here!</h1>
      </div>
      <form className={styles.submitForm} onSubmit={onSubmitHandler}>
        <div className={styles.submitContainer}>
          <div className={styles.fieldWrapper}>
            <label>
              Grid size <span>*</span>
            </label>
            <InputField
              name={gridSize}
              min={4}
              value={gridSize}
              changeHandler={(e) => setGridSize(e.target.value)}
              placeholder="Please enter gird size, min: 4"
            />
          </div>
          <div className={styles.fieldWrapper}>
            <label>
              Commands <span>*</span>
            </label>
            <input
              id="commands"
              type="test"
              name="commands"
              value={commands}
              onChange={commandsHandler}
              placeholder="Please Enter commands L,R,U,D (case insensitive)"
              required
            />
          </div>
          <div className={styles.fieldWrapper}>
            <label>
              Zombie position <span>*</span>
            </label>
            <div className={styles.fieldInnerContainer}>
              <label>X</label>
              <InputField
                name="x"
                max={gridSize - 1}
                value={zombie.x}
                changeHandler={(e) => changeZombieHandler(e)}
              />
              <label>Y</label>
              <InputField
                name="y"
                max={gridSize - 1}
                value={zombie.y}
                changeHandler={(e) => changeZombieHandler(e)}
              />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <label>
              Creatures position <span>*</span>
            </label>
            {creatures.map((element, index) => {
              return (
                <div className={styles.fieldInnerContainer} key={index}>
                  <label>X</label>
                  <InputField
                    name="x"
                    max={gridSize - 1}
                    value={element.x}
                    changeHandler={(e) => changeCreaturesHandler(index, e)}
                  />
                  <label>Y</label>
                  <InputField
                    name="y"
                    max={gridSize - 1}
                    value={element.y}
                    changeHandler={(e) => changeCreaturesHandler(index, e)}
                  />
                  {index ? (
                    <button
                      type="button"
                      onClick={() => removeCreatureHandler(index)}
                      className={styles.submitBtn}
                      style={{ margin: "5px 0", backgroundColor: "#c92a2a" }}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <button
            className={styles.submitBtn}
            type="button"
            onClick={() => addNewCreatureHandler()}
          >
            Add creatures
          </button>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default SubmitForm;
