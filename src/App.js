import { useCallback, useEffect, useState } from "react";
import Form from "./components/Form/Form";
import TaskList from "./components/Tasks/TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        "https://task-tracker-ak-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong... (Error " + response.status + ")"
        );
      }
      const tasks = await response.json();

      const fetchedTasks = [];
      for (const key in tasks) {
        fetchedTasks.push({
          id: key,
          title: tasks[key].title,
          description: tasks[key].description,
          dueDate: tasks[key].dueDate,
          completed: tasks[key].completed,
        });
      }
      setTaskList(fetchedTasks);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  async function addTaskHandler(task) {
    setError(null);
    try {
      const response = await fetch(
        "https://task-tracker-ak-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong... (Error " + response.status + ")"
        );
      }
      fetchDataHandler();
    } catch (error) {
      setError(error.message);
    }
  }

  async function taskCompletionStatusChangeHandler(task) {
    setError(null);
    try {
      const response = await fetch(
        `https://task-tracker-ak-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(task),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong... (Error " + response.status + ")"
        );
      }
      fetchDataHandler();
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteTaskHandler(id) {
    setError(null);
    try {
      const response = await fetch(
        `https://task-tracker-ak-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(
          "Something went wrong... (Error " + response.status + ")"
        );
      }

      fetchDataHandler();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>Task Tracker</h1>
      {error && <h2>{error}</h2>}
      <Form onAddTask={addTaskHandler} />
      <TaskList
        tasks={taskList}
        onCompletionStatusChange={taskCompletionStatusChangeHandler}
        onTaskDeletion={deleteTaskHandler}
      />
    </div>
  );
}

export default App;
