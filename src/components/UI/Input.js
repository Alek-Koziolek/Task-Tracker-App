import { useState } from "react";
import styles from "./Input.module.css";

function Input(props) {
  const [clicked, setClicked] = useState(false);
  function clickHandler() {
    setClicked(true);
  }
  
  const validity = !clicked || props.isValid;

  const classes = `${styles.input} ${props.className} ${
    validity ? "" : styles.invalid
  }`;
  return (
    <div className={classes}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        min={props.min}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onClickCapture={clickHandler}
      />
    </div>
  );
}

export default Input;
