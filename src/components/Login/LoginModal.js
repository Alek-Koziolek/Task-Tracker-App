import { Fragment } from "react";
import ReactDOM from "react-dom";
import LoginForm from "./LoginForm";
import styles from "./LoginModal.module.css";

function Backdrop() {
  return <div className={styles.backdrop}></div>;
}

function LoginModal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.querySelector("#backdrop-root")
      )}
      {ReactDOM.createPortal(
        <LoginForm onLogin={props.onLogin}/>,
        document.querySelector("#modal-root")
      )}
    </Fragment>
  );
}

export default LoginModal;
