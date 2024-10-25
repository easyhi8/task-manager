//App.js
import React, { useEffect }  from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import AuthForm from "./components/AuthForm"
import TaskPage from "./components/TaskForm";

function App() {
  const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }, [navigate]);

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/tasks" element={<TaskPage />} />
        </Routes>
    </div>
    );
}

export default App;
