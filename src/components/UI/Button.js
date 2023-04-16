import styles from "./Button.module.css";

function Button(props) {
  const classes = `${styles.button} ${props.className}`;
  return (
    <button
      type={props.type || "button"}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
