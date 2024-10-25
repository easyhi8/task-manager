//TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tasks');
            console.log("APIからのレスポンス:", response.data);
            setTasks(response.data);
        } catch (err) {
            console.error("タスク取得時のエラー:", err);
        }
    };

    getTasks();
}, []);


  return (
    <div>
      <h2>タスク一覧表</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-title">
              <span>{task.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
