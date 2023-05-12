import styles from "./InputField.module.scss";

function InputField({ name, min, max, value, changeHandler, placeholder }) {
  return (
    <input
      className={styles.inputValue}
      type="number"
      name={name}
      min={min || 0}
      max={max || null}
      required
      value={value ?? ""}
      placeholder={placeholder || ""}
      onChange={changeHandler}
    />
  );
}

export default InputField;
