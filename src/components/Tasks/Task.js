import { useState } from "react";
import Button from "../UI/Button";
import styles from "./Task.module.css";

function Task(props) {
  let isUrgent = false;
  let isCritical = false;
  const [clicked, setClicked] = useState(false);

  if (props.dueDate !== undefined) {
    const timeLeft = Math.round((new Date(props.dueDate) - Date.now()) / (1000 * 60 * 60 * 24)*100 
    )/100;
    isUrgent = timeLeft <= 1;
    isCritical = timeLeft <= 0;
  }

  function completionStatusChangeHandler() {
    props.onCompletionStatusChange({
      id: props.id,
      title: props.title,
      description: props.description,
      dueDate: props.dueDate,
      completed: !props.completed,
    });
  }

  function taskDeletionHandler() {
    props.onTaskDeletion(props.id);
  }

  function taskClickHandler(){
    setClicked(prevState => !prevState);
  }

  return (
    <li
      className={`${styles.task} ${
        props.completed && styles["task-completed"]
      } ${clicked && styles.clicked}
      ${!isCritical && isUrgent && !props.completed && styles.urgent}
      ${isCritical && !props.completed && styles.critical}`}
      onClick={taskClickHandler}
    >
      <span className={styles.title}>{props.title}</span>
      <span className={styles.date}>Due: {props.dueDate}</span>
      <p className={styles.description}>{props.description}</p>
      <br />
      {props.completed ? (
        <Button
          className={styles["done-btn"]}
          onClick={completionStatusChangeHandler}
        >
          Undo
        </Button>
      ) : (
        <Button
          className={styles["done-btn"]}
          onClick={completionStatusChangeHandler}
        >
          Done
        </Button>
      )}
      <Button className={styles["delete-btn"]} onClick={taskDeletionHandler}>
        Delete
      </Button>
    </li>
  );
}

export default Task;
