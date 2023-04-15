import { useState } from "react";
import Form from "./components/Form/Form";
import TaskList from "./components/Tasks/TaskList";

function App() {
  const dummyTasks = [
    {
      id: 1,
      title: "First task",
      description: "This is the first task",
      dueDate: '2023-04-09',
      completed: true
    },
    {
      id: 2,
      title: "Second task",
      description: "This is the second task",
      dueDate: '2023-04-11',
      completed: false,
    },
  ];

  const [taskList, setTaskList] = useState(dummyTasks);

function addTaskHandler(task){
  setTaskList(prevTaskList => {
    return [...prevTaskList, task];
  })
}

function taskCompletionHandler(id){
  setTaskList(prevTaskList =>{
    const updatedTaskList = prevTaskList.map(task => {
      if(task.id === id) task.completed = true;
      return task
    });
    return updatedTaskList;
  })
}

function taskReinstatementHandler(id){
  setTaskList(prevTaskList =>{
    const updatedTaskList = prevTaskList.map(task => {
      if(task.id === id) task.completed = false;
      return task
    });
    return updatedTaskList;
  })
}

  return (
    <div>
      <h1>Task Tracker</h1>
      <Form onAddTask={addTaskHandler} />
      <TaskList tasks={taskList} onCompletion={taskCompletionHandler} onReinstatement={taskReinstatementHandler} />
    </div>
  );
}

export default App;
