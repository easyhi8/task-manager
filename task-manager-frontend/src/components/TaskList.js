import React from "react";

const TaskList = ({ categoryList }) => {
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

export default TaskList;
