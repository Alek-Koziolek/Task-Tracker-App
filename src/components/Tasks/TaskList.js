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
          onCompletionStatusChange={props.onCompletionStatusChange}
          onTaskDeletion={props.onTaskDeletion}
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
          onCompletionStatusChange={props.onCompletionStatusChange}
          onTaskDeletion={props.onTaskDeletion}
        />
      );
    });

  return (
    <Fragment>
      {props.tasks.length > 0 && <TasksInfo
        completed={completedTasks.length}
        allTasksNumber={props.tasks.length}
      />}
      <ul>{ongoingTasks}</ul>
      <hr />
      <ul>{completedTasks}</ul>
    </Fragment>
  );
}

export default TaskList;
