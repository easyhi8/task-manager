import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskForm from "./components/TaskForm";
import taskService from "./services/apiService";
import ReactDOM from 'react-dom';
import TaskList from "./components/TaskList";

function App() {

    const addTask = (title, description, status) => {
        taskService.addTask(title, description, status)
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
            <TaskList />
            <TaskForm addTask={addTask} />
          </div>
        } />
      </Routes>
    </div>
    );
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <p>タスク管理ページ</p>
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
