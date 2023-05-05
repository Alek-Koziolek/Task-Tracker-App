import { Fragment, useCallback, useEffect, useState } from "react";
import LoginContext from "./context/login-context";
import Form from "./components/Form/Form";
import TaskList from "./components/Tasks/TaskList";
import styles from "./App.module.css";
import LoginHeader from "./components/Login/LoginHeader";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState(true);

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
    <LoginContext.Provider value={{ isLoggedIn: false, username: "Alek" }}>
      <header className={styles.header}>
        <h1>Task Tracker</h1>
        <LoginHeader />
      </header>
      {error && <h2 className={styles.error}>{error}</h2>}
      {!error && (
        <Fragment>
          <Form onAddTask={addTaskHandler} />
          <TaskList
            tasks={taskList}
            onCompletionStatusChange={taskCompletionStatusChangeHandler}
            onTaskDeletion={deleteTaskHandler}
          />
        </Fragment>
      )}
    </LoginContext.Provider>
  );
}

export default App;
