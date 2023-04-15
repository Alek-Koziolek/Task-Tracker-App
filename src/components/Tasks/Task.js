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
    <li>
      {isCritical && <span>!!!AAAAAAAAAAAAAA!!!</span>}
      {!isCritical && isUrgent && <span>!</span>}
      <span>{props.title}</span>
      <p>{props.description}</p>
      <span>{props.dueDate}</span>
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
