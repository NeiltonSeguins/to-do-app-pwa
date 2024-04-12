import "./index.css";
import "./App.css";
import Form from "./components/Form";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import foco from "./assets/foco.png";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [totalDeTasksCompletas, setTotalDeTasksCompletas] = useState(0);

  useEffect(() => {
    const tasksCompletas = () => {
      if (tasks.length === 0) {
        return tasks.filter((task) => task.completa).length.toFixed(2);
      }
      return (
        (tasks.filter((task) => task.completa).length / tasks.length) *
        100
      ).toFixed(2);
    };
    setTotalDeTasksCompletas(tasksCompletas);
  }, [tasks]);

  const updateLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <>
      <main className="container">
        <h1>To-Do</h1>
        <img src={foco} alt="Pessoa com fone de ouvido de costas concentrado" />
        <Form
          tasks={tasks}
          setTasks={setTasks}
          updateLocalStorage={updateLocalStorage}
        />
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTotalDeTasksCompletas={setTotalDeTasksCompletas}
          updateLocalStorage={updateLocalStorage}
        />
        <h3 className="tasks__completas">{`Total de tasks: ${tasks.length}`}</h3>
        <h3 className="tasks__completas">
          {`Total de tasks concluídas: ${totalDeTasksCompletas}%`}
        </h3>
      </main>
    </>
  );
}

export default App;
