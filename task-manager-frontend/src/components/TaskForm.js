import React, { useState } from "react";
import TaskList from "./TaskList";

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const handleClick = (e) => {
        if (!title || !description) {
              alert("タイトルと説明を入力してください。");
              return;
          }
        addTask(title, description);
        setTitle("");
        setDescription("");
    };
    
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
  };

  return (
    <div>
        <TaskList/>
        <h2>タスクの新規追加</h2>
        <div className="textBox">
            <input type="text" placeholder="タスクタイトル" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
            <textarea placeholder="タスクの説明" value={description} onChange={(e) => setDescription(e.target.value)} rows="2" /><br />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <button onClick={handleClick}>追加</button>
              <button style={{marginRight: "0"}} onClick={handleLogout}>ログアウト</button>
            </div>
        </div>
    </div>
    );
};

export default TaskForm;
