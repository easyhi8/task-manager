import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthForm from "./components/AuthForm"
import TaskPage from "./components/TaskForm";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm/>} />
        <Route path="/TaskPage" element={<TaskPage/>} />
      </Routes>
    </div>
    );
}

export default App;
