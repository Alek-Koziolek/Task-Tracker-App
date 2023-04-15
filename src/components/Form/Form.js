import { useRef, useReducer } from "react";

function titleReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
}

function Form(props) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: "",
    isValid: null,
  });
  
  function titleChangeHandler (event){
    dispatchTitle({ type: "USER_INPUT", val: event.target.value });
  };

  function validateTitleHandler (event){
    dispatchTitle({ type: "INPUT_BLUR", val: event.target.value });
  };


  function submitFormHandler(event) {
    event.preventDefault();

    props.onAddTask({
      id: Math.random(),
      title: title.current.value,
      description: description.current.value,
      date: new Date().toISOString(),
      dueDate: dueDate.current.value,
      completed: false,
    });

    title.current.value = "";
    description.current.value = "";
    dueDate.current.value = "";
  }

  const currentDate = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

  return (
    <form onSubmit={submitFormHandler}>
      <h2>Add new Task</h2>
      <label htmlFor="title">Title:</label>
      <input id="title" type="text" ref={title} onChange={titleChangeHandler} onBlur={validateTitleHandler} />
      <label htmlFor="description">Description (optional):</label>
      <textarea id="description" ref={description} />
      <label htmlFor="date">Due date (optional):</label>
      <input id="date" type="date" ref={dueDate} min={currentDate} />
      <button type="submit" disabled={!titleState.isValid && "disabled"} >Add Task</button>
    </form>
  );
}

export default Form;
