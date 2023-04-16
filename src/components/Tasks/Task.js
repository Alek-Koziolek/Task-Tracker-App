import styles from './Task.module.css';

function Task(props) {
  let isUrgent = false;
  let isCritical = false;

  if (props.dueDate !== undefined) {
    const timeLeft = Math.floor(
      (new Date(props.dueDate) - Date.now()) / (1000 * 60 * 60 * 24)
    );
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

  function taskDeletionHandler(){
    props.onTaskDeletion(props.id);
  }

  return (
    <li className={`${styles.task} ${props.completed && styles['task-completed']}`}>
      {isCritical && !props.completed && <span>!!!AAAAAAAAAAAAAA!!!</span>}
      {!isCritical && isUrgent && !props.completed && <span>!</span>}
      <span className={styles.title}>{props.title}</span>
      <p className={styles.description}>{props.description}</p>
      <span className={styles.date}>{props.dueDate}</span>
      {props.completed ? (
        <button onClick={completionStatusChangeHandler}>Undo</button>
      ) : (
        <button onClick={completionStatusChangeHandler}>Done</button>
      )}
      <button onClick={taskDeletionHandler}>x</button>
    </li>
  );
}

export default Task;
