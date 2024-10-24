import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import TaskForm from "./components/TaskForm";
import apiService from "./services/apiService";
import ReactDOM from 'react-dom';
import TaskList from "./components/TaskList";

function App() {

    const addTask = (title, description, status) => {
        apiService.addTask(title, description, status)
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
    <Route path="/tasks" component={TaskList} />
    <TaskForm addTask={addTask} />
</div>
    );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
// export default App;
