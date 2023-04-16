import styles from "./Input.module.css";

function Input(props) {
  const classes = `${styles.input} ${props.className} ${
    props.isValid ? "" : styles.invalid
  }`;
  return (
    <div className={classes}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
}

export default Input;
