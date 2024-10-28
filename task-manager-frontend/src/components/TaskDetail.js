//TaskDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskDetail = ({id}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/tasks/${id}`);
          console.log(response.data);
          setTasks(response.data);
        } catch (err) {
            console.error("タスク取得時のエラー:", err);
        }
    };

    getTasks();
}, [id]);


  return (
    <div>
      <h2>タスク詳細</h2>
      <ul>
        {tasks.map((task) => (
            <div key={task.id}>
              <span>{task.title}</span>
              <span>{task.description}</span>
              <button>編集</button>
            </div>
        ))}
      </ul>
    </div>
  );
}

export default TaskDetail;
