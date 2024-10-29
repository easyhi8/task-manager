import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskService from '../services/taskService';

const TaskForm = ({ addTask }) => {
    const statusOptions = ["未完了", "完了"];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState(statusOptions[0]);
    const navigate = useNavigate();
    
    useEffect(() => {
      const today = new Date().toISOString().split('T')[0];
      setDeadline(today);
  }, []);
    
    const handleClick = (e) => {
        if (!title || !description || !deadline || !status) {
              alert("すべてのフィールドを入力してください");
              return;
          }
        console.log("Sending data:", { title, description, deadline, status });
        taskService.addTask(title, description, deadline, status)
        .then(response => {
            console.log(response.data);
            alert("タスクが正常に追加されました")
            window.location.reload()
        })
        .catch(error => {
            console.error("Error adding task:", error);
            alert("タスクの追加中にエラーが発生しました");
        });
        setTitle("");
        setDescription("");
        setDeadline(new Date().toISOString().split('T')[0]);
        setStatus(statusOptions[0]);
    };
    
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

  return (
    <div>
        <h2>タスクの新規追加</h2>
        <div className="textBox">
            <input type="text" placeholder="タスクタイトル" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
            <textarea placeholder="タスクの説明" value={description} onChange={(e) => setDescription(e.target.value)} rows="2" /><br />
            <div className="inputRow">
              <div className="inputGroup">
                <label>期限</label>
                <input type="date" id="dateInput" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
                <div className="inputGroup">
                  <label>ステータス</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>{statusOptions.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
                </div>
            </div>
            <div className="buttonContainer" >
              <button onClick={handleClick}>追加</button>
              <button onClick={handleLogout}>ログアウト</button>
            </div>
        </div>
    </div>
    );
};

export default TaskForm;
