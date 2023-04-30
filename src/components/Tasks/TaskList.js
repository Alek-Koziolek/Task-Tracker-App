import Task from "./Task";
import TasksInfo from "./TasksInfo";
import Wrapper from "../UI/Wrapper";
import styles from './TaskList.module.css';

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
    <Wrapper className={styles.wrapper}>
      {props.tasks.length > 0 && (
        <TasksInfo
          completed={completedTasks.length}
          allTasksNumber={props.tasks.length}
        />
      )}
      <ul className={styles.list}>{ongoingTasks}</ul>
      <ul className={styles.list}>{completedTasks}</ul>
    </Wrapper>
  );
}

export default TaskList;
