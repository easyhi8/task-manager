//TaskDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import taskService from '../services/taskService';

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
  
  const handleDelete = () => {
     // 確認ダイアログを表示
    if (window.confirm("このタスクを削除してもよろしいですか？")) {
      taskService.deleteTask(task.id)
          .then(response => {
              console.log(response.data);
              alert("タスクが正常に削除されました")
              navigate(`/tasks`);
          })
          .catch(error => {
              console.error("Error deleting task:", error);
              alert("タスクの削除中にエラーが発生しました");
          });
    } else {
      console.log("タスクの削除がキャンセルされました");
  }
};

  return (
    <div>
        <h2>タスク詳細</h2>
        <div className="textBox">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="buttonContainer">
              <button onClick={handleEdit}>編集</button>
              <button onClick={handleBack}>戻る</button>
              <button style={{marginLeft: "auto"}} onClick={handleDelete}>削除</button>
            </div>
        </div>
    </div>
  );
}

export default TaskDetail;
