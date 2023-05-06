import {
  useState,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  Fragment,
} from "react";
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
    return { value: action.val, isValid: passwordValidityCheck(action.val) };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: passwordValidityCheck(action.val) };
  }
  return { value: "", isValid: false };
}

function passwordValidityCheck(password) {
  if (
    password.trim().length > 0 &&
    password.match(/.*[A-Z].*/g) &&
    password.match(/.*[a-z].*/g) &&
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

  const [error, setError] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({
    valid: false,
    correct: false,
  });

  const fetchUsersData = useCallback(async () => {
    setError(null);
    setUsersList([]);
    try {
      const response = await fetch(
        "https://task-tracker-ak-default-rtdb.europe-west1.firebasedatbase.app/users.json"
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong... (Error " + response.status + ")"
        );
      }
      const users = await response.json();

      const fetchedUsers = [];
      for (const key in users) {
        fetchedUsers.push({
          key: key,
          id: users[key].id,
          username: users[key].username,
          password: users[key].password,
        });
      }
      setUsersList(fetchedUsers);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  async function addUserData() {
    setError(null);
    try {
      const response = await fetch(
        "https://task-tracker-ak-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        {
          method: "POST",
          body: JSON.stringify({
            id: Math.random(),
            username: usernameState.value,
            password: passwordState.value,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong... (Error " + response.status + ")"
        );
      }
      fetchUsersData();
    } catch (error) {
      setError(error.message);
    }
  }

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
    setDisplayMessage({
      valid: true,
      correct: false,
    });
  }

  const ctx = useContext(LoginContext);

  useEffect(() => {
    if (!ctx.isLoggedIn) fetchUsersData();
  }, [ctx.isLoggedIn, fetchUsersData]);

  function submitFormHandler(event) {
    event.preventDefault();
    fetchUsersData();
    const currentUser = usersList.find(
      (user) => user.username === usernameState.value
    );
    if (currentUser) {
      if (passwordState.value === currentUser.password) {
        ctx.onLogin(usernameState.value, currentUser.key);
        usernameState.value = "";
        passwordState.value = "";
        props.onLogin();
      } else {
        setDisplayMessage({
          valid: false,
          correct: true,
        });
      }
    } else {
      setSignUp(true);
    }
  }

  function denyLoginHandler() {
    props.onLogin();
    setDisplayMessage({
      valid: false,
      correct: false,
    });
  }

  function addUserHandler() {
    addUserData();
    setSignUp(false);
    setDisplayMessage({
      valid: false,
      correct: false,
    });
  }

  function denySignUpHandler() {
    props.onLogin();
    setSignUp(false);
    setDisplayMessage({
      valid: false,
      correct: false,
    });
  }

  return (
    <Wrapper className={styles["login-form"]}>
      <form onSubmit={submitFormHandler}>
        {error && <h3 className={styles.error}>{error}</h3>}
        {signUp ? (
          <Fragment>
            <h3>
              It seems that You are a new user.
              <br />
              Would you like to sign up?
            </h3>
            <Button onClick={addUserHandler}>Yes</Button>
            <Button onClick={denySignUpHandler}>No</Button>
          </Fragment>
        ) : (
          <Fragment>
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
            {!passwordState.isValid && displayMessage.valid && (
              <p>
                Password must contain at least one lowercase letter, one capital
                letter and one number.
              </p>
            )}
            {displayMessage.correct && <p>Password is incorrect.</p>}
            <Button
              type="submit"
              disabled={!usernameState.isValid || !passwordState.isValid}
            >
              Login
            </Button>
            <Button onClick={denyLoginHandler}>Cancel</Button>
          </Fragment>
        )}
      </form>
    </Wrapper>
  );
}

export default LoginForm;
