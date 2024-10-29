//TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/tasks');
          console.log(response.data);
          setTasks(response.data);
        } catch (err) {
            console.error("タスク取得時のエラー:", err);
        }
    };

    getAllTasks();
}, []);


  return (
    <div>
      <h2>タスク一覧表</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-title">
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
