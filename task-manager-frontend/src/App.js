import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import useCategories from "./hooks/useCategories";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import apiService from "./services/apiService";

function App() {
    const { categoryList, refreshCategories } = useCategories();

    const addTask = (title, description, status) => {
        apiService.addTask(title, description, status)
            .then(() => {
                alert("Task added successfully");
                refreshCategories();
            })
            .catch(err => {
                console.error("Error adding task: ", err);
                alert("Failed to add task");
            });
    };
    
    const getTasks = (title, description, status) => {
        apiService.getTasks(title, description, status)
            .then(() => {
                alert("Tasks getted successfully");
                refreshCategories();
            })
            .catch(err => {
                console.error("Error getting tasks: ", err);
                alert("Failed to get tasks");
            });
    };
    
    const updateTask = (title, description, status) => {
        apiService.updateTask(title, description, status)
            .then(() => {
                alert("Task updated successfully");
                refreshCategories();
            })
            .catch(err => {
                console.error("Error updating task: ", err);
                alert("Failed to update task");
            });
    };
    
  const deleteTask = (title, description, status) => {
        apiService.deleteTask(title, description, status)
            .then(() => {
                alert("Task deleted successfully");
                refreshCategories();
            })
            .catch(err => {
                console.error("Error deleting task: ", err);
                alert("Failed to delete task");
            });
    };

    return (
        <div className="App">
            <TaskForm addTask={addTask} />
            <TaskForm getTask={getTasks} />
            <TaskForm getTask={updateTask} />
            <TaskForm getTask={deleteTask} />
            <TaskList categoryList={categoryList} />
        </div>
    );
}

export default App;
