import { Fragment } from "react";
import Task from "./Task";
import TasksInfo from "./TasksInfo";

function TaskList(props) {
  const ongoingTasks = props.tasks
    .filter((task) => {
      return !task.completed;
    })
    .map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          completed={false}
          onCompletion={props.onCompletion}
          onReinstatement={props.onReinstatement}
        />
      );
    });

  const completedTasks = props.tasks
    .filter((task) => {
      return task.completed;
    })
    .map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          completed={true}
          onCompletion={props.onCompletion}
          onReinstatement={props.onReinstatement}
        />
      );
    });

  return (
    <Fragment>
      <TasksInfo
        completed={completedTasks.length}
        allTasksNumber={props.tasks.length}
      />
      <ul>{ongoingTasks}</ul>
      <hr />
      <ul>{completedTasks}</ul>
    </Fragment>
  );
}

export default TaskList;
