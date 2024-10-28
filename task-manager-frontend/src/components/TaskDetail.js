//TaskDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const getTask = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/tasks/${id}`);
          console.log(response.data);
          setTask(response.data);
        } catch (err) {
            console.error("タスク取得時のエラー:", err.response ? err.response.data : err.message);
        }
    };

    getTask();
}, [id]);


  return (
    <div>
        <h2>タスク詳細</h2>
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button>編集</button>
        </div>
    </div>
  );
}

export default TaskDetail;
