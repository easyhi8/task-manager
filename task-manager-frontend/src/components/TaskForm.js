import React, { useState } from "react";

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

  return (
    <div>
        <p>タスクの新規追加</p>
        <div className="textBox">
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
            <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
            <button onClick={handleClick}>追加</button>
        </div>
    </div>
    );
};

export default TaskForm;
