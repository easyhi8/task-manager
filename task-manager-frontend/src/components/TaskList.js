import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error("タスク取得時のエラー:");
      }
    };

    getTasks();
  }, []);

  return (
    <div>
      <p>タスク一覧表</p>
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
