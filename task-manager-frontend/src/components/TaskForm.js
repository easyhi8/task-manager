import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

  return (
    <div>
        <p>タスクの新規追加</p>
        <div className="textBox">
            <input type="text" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
            <input type="text" placeholder="Email" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
            <button onClick={() => addTask(title, description)}>追加</button>
        </div>
    </div>
    );
};

export default TaskForm;
