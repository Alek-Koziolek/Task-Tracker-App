function Task(props) {
  let isUrgent = false;

  if (props.dueDate !== undefined) {
    const timeLeft = Math.floor((new Date(props.dueDate) - Date.now()) / (1000 * 60 * 60 * 24));
    isUrgent = timeLeft <= 1 && timeLeft >= 0;
  }

  function taskCompletionHandler() {
    props.onCompletion(props.id);
  }

function taskReinstatementHandler(){
  props.onReinstatement(props.id);
}

  return (
    <li>
      {isUrgent && <span>!</span>}
      <span>{props.title}</span>
      <p>{props.description}</p>
      <span>{props.dueDate}</span>
      {props.completed ? <button onClick={taskReinstatementHandler} >Undo</button> : <button onClick={taskCompletionHandler} >Done</button>}
    </li>
  );
}

export default Task;
