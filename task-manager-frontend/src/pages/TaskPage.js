//TaskPage.js
import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import taskService from "../services/taskService";

function TaskPage() {
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
  <div className="taskPage">
          <h1>タスク管理ページ</h1>
          <TaskList />
          <TaskForm addTask={addTask} />
  </div>
  );
}

export default TaskPage;
