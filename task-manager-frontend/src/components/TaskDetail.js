//TaskDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

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
  
  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`);
};
  const handleBack = () => {
    navigate(`/tasks`);
};

  return (
    <div>
        <h2>タスク詳細</h2>
        <div className="textBox">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div>
              <button onClick={handleEdit}>編集</button>
              <button onClick={handleBack}>戻る</button>
            </div>
        </div>
    </div>
  );
}

export default TaskDetail;
