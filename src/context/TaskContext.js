import React, { createContext, useState, useEffect } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (searchTerm, dueDate, sortByCompleted) => {
    try {
      const params = {};
      if (searchTerm) {
        params.search = searchTerm;
      }
      if (dueDate) {
        params.dueDate = dueDate;
      }
      if (sortByCompleted !== undefined) {
        params.completed = sortByCompleted;
      }
      const response = await axios.get('/tasks', { params });
      if (response && response.data) {
        setTasks(response.data.data);
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message || error);
      setTasks([]);
    }
  };


  const addTask = async (task) => {
    try {
      const response = await axios.post('/add-task', task);
      if (!response.data) {
        console.error('Unexpected response structure:', response);
      }
      setTasks((prevTasks) => [...prevTasks, response.data.data]);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error adding task:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const updateTaskStatus = async (taskId, currentStatus) => {
    const updatedStatus = !currentStatus;
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed: updatedStatus } : task
    );
    setTasks(updatedTasks);

    try {
      await axios.patch(`/task/${taskId}`, { completed: updatedStatus });
      toast.success('Task status updated successfully');
    } catch (error) {
      console.error('Error updating task status:', error);
      const revertedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, completed: currentStatus } : task
      );
      setTasks(revertedTasks);
      toast.error('Failed to update task status');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/task/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
