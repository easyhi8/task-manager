import React, { useEffect, useState } from "react";
import axios from "axios";

const TasksTable = ({ categoryList }) => {
  return (
    <div>
      <p>タスク一覧表</p>
      <ul>
          {categoryList.map((val, index) => (
              <li key={index}>
                  <div className="task-title">
                      <span>{val.title}</span>
                  </div>
              </li>
          ))}
      </ul>
    </div>
    );
};

const TaskList = () => {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    };
    getTasks();
  })

  return <TasksTable categoryList={tasks} />;
}

export default TaskList;
