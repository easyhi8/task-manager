//App.js
import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthForm from "./components/AuthForm"
import TaskPage from "./pages/TaskPage";
import TaskDetail from "./components/TaskDetail";
import TaskEdit from "./components/TaskEdit";

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks/edit/:id" element={<TaskEdit />} />
        </Routes>
    </div>
    );
}

export default App;
