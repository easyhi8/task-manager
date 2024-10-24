import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import TaskForm from "./components/TaskForm";
import taskService from "./services/taskService";
import TaskList from "./components/TaskList";

function App() {

    const addTask = (title, description) => {
        taskService.addTask(title, description)
            .then(() => {
                alert("Task added successfully");
            })
            .catch(err => {
                console.error("Error adding task: ", err);
                alert("Failed to add task");
            });
    };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div>
            <h1>タスク管理ページ</h1>
            <TaskList />
            <TaskForm addTask={addTask} />
          </div>
        } />
      </Routes>
    </div>
    );
}

export default App;
