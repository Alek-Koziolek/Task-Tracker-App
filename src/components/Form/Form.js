import { useRef, useReducer } from "react";
import Button from "../UI/Button";
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

function Form(props) {
  const description = useRef();
  const dueDate = useRef();

  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: "",
    isValid: null,
  });

  function titleChangeHandler(event) {
    dispatchTitle({ type: "USER_INPUT", val: event.target.value });
  }

  function validateTitleHandler(event) {
    dispatchTitle({ type: "INPUT_BLUR", val: event.target.value });
  }

  function submitFormHandler(event) {
    event.preventDefault();

    props.onAddTask({
      id: Math.random(),
      title: titleState.value,
      description: description.current.value,
      date: new Date().toISOString(),
      dueDate: dueDate.current.value,
      completed: false,
    });

    titleState.value = "";
    description.current.value = "";
    dueDate.current.value = "";
  }

  const currentDate = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

  return (
    <form onSubmit={submitFormHandler} className={styles.form}>
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
        <label htmlFor="description">Description:</label>
        <input  ref={description} />
        <label htmlFor="date">Due date:</label>
        <input id="date" type="date" ref={dueDate} min={currentDate} />
      </div>

      <Button type="submit" disabled={!titleState.isValid && "disabled"}>
        Add Task
      </Button>
    </form>
  );
}

export default Form;
