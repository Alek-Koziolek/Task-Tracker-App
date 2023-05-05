import { useContext, useReducer } from "react";
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import styles from "./LoginForm.module.css";
import Input from "../UI/Input";
import LoginContext from "../../context/login-context";

function usernameReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
}
function passwordReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: passwordValidityChaeck(action.val) };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: passwordValidityChaeck(action.val) };
  }
  return { value: "", isValid: false };
}

function passwordValidityChaeck(password) {
  if (
    password.trim().length > 0 &&
    password.match(/.*[A-Z].*/g) &&
    !password.match(/.*\s.*/g) &&
    password.match(/.*[0-9].*/)
  )
    return true;
  else return false;
}

function LoginForm(props) {
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  function usernameChangeHandler(event) {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value });
  }

  function validateUsernameHandler(event) {
    dispatchUsername({ type: "INPUT_BLUR", val: event.target.value });
  }

  function passwordChangeHandler(event) {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  }

  function validatePasswordHandler(event) {
    dispatchPassword({ type: "INPUT_BLUR", val: event.target.value });
  }

  const ctx = useContext(LoginContext);

  function submitFormHandler(event) {
    event.preventDefault();
    props.onLogin();
    if (!ctx.isLoggedIn) ctx.onLogin(usernameState.value);

    usernameState.value = "";
    passwordState.value = "";
  }

  return (
    <Wrapper className={styles["login-form"]}>
      <form onSubmit={submitFormHandler}>
        <h2>Login</h2>
        <div>
          <Input
            id="username"
            label="Username:"
            type="text"
            value={usernameState.value}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
            isValid={usernameState.isValid}
          />
          <Input
            id="password"
            label="Password:"
            type="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            isValid={passwordState.isValid}
          />
        </div>
        {!passwordState.isValid && (
          <p>
            Password must contain at least one lowercase letter, one capital
            letter and one number.
          </p>
        )}
        <Button
          type="submit"
          disabled={!usernameState.isValid || !passwordState.isValid}
        >
          Login
        </Button>
      </form>
    </Wrapper>
  );
}

export default LoginForm;
