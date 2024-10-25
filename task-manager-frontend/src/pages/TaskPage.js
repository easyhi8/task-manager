import React from "react";

import TaskForm from "./components/TaskForm";
import taskService from "./services/taskService";
import TaskList from "./components/TaskList";

function TaskManagement() {

  const addTask = (title, description) => {
      taskService.addTask(title, description)
          .then(() => {
              alert("Task added successfully");
          })
          .catch(err => {
              console.error("Error adding task: ", err);
              alert("Failed to add task");
          });
  };

return (
  <div className="taskManagement">
        <div>
          <h1>タスク管理ページ</h1>
          <TaskList />
          <TaskForm addTask={addTask} />
        </div>
  </div>
  );
}

export default TaskManagement;
