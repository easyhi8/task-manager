import Axios from 'axios';

const getTasks = () => {
    return Axios.get("http://localhost:3001/api/get/tasks");
};

const addTask = (title, description,deadline, status) => {
    return Axios.post("http://localhost:3001/api/tasks", { title, description,deadline, status });
};

const updateTask = (id,title, description,deadline, status) => {
  return Axios.put("http://localhost:3001/api/tasks", { title, description,deadline, status });
};

const deleteTask = (id) => {
  return Axios.delete("http://localhost:3001/api/tasks");
};

const taskService = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};

export default taskService;
