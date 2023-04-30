import { useReducer } from "react";
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import styles from "./Form.module.css";
import Input from "../UI/Input";

function titleReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
}

function descriptionReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
}

function dateReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
}

function Form(props) {
  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: "",
    isValid: null,
  });
  const [descriptionState, dispatchDescription] = useReducer(
    descriptionReducer,
    {
      value: "",
      isValid: null,
    }
  );
  const [dateState, dispatchDate] = useReducer(
    dateReducer,
    {
      value: "",
      isValid: null,
    }
  );

  function titleChangeHandler(event) {
    dispatchTitle({ type: "USER_INPUT", val: event.target.value });
  }

  function validateTitleHandler(event) {
    dispatchTitle({ type: "INPUT_BLUR", val: event.target.value });
  }

  function descriptionChangeHandler(event) {
    dispatchDescription({ type: "USER_INPUT", val: event.target.value });
  }

  function validateDescriptionHandler(event) {
    dispatchDescription({ type: "INPUT_BLUR", val: event.target.value });
  }

  function dateChangeHandler(event) {
    dispatchDate({ type: "USER_INPUT", val: event.target.value });
  }

  function validateDateHandler(event) {
    dispatchDate({ type: "INPUT_BLUR", val: event.target.value });
  }

  function submitFormHandler(event) {
    event.preventDefault();

    props.onAddTask({
      id: Math.random(),
      title: titleState.value,
      description: descriptionState.value,
      dueDate: dateState.value,
      completed: false,
    });

    titleState.value = "";
    descriptionState.value = "";
    dateState.value = "";
  }

  const currentDate = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

  return (
    <Wrapper className={styles.form}>
      <form onSubmit={submitFormHandler}>
        <h2>Add new Task</h2>
        <div>
          <Input
            id="title"
            label="Title:"
            type="text"
            value={titleState.value}
            onChange={titleChangeHandler}
            onBlur={validateTitleHandler}
            isValid={titleState.isValid}
          />
          <Input
            id="description"
            label="Description:"
            type="text"
            value={descriptionState.value}
            onChange={descriptionChangeHandler}
            onBlur={validateDescriptionHandler}
            isValid={descriptionState.isValid}
          />
          <Input
            id="date"
            label="Due date:"
            type="date"
            value={dateState.value}
            onChange={dateChangeHandler}
            onBlur={validateDateHandler}
            min={currentDate}
            isValid={dateState.isValid}
          />
        </div>

        <Button
          type="submit"
          disabled={
            !titleState.isValid ||
            !descriptionState.isValid ||
            !dateState.isValid
          }
        >
          Add Task
        </Button>
      </form>
    </Wrapper>

  );
}

export default Form;
