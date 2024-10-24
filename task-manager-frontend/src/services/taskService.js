import Axios from 'axios';

const getTasks = () => {
    return Axios.get("http://localhost:3001/api/get/tasks");
};

const addTask = (title, description) => {
    return Axios.post("http://localhost:3001/api/insert/task", { title, description });
};

const updateTask = () => {
  return Axios.update("http://localhost:3001/api/get/update");
};

const deleteTask = () => {
  return Axios.delete("http://localhost:3001/api/get/delete");
};

const taskService = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};

export default taskService;
