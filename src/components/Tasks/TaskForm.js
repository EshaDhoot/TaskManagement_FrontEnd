import React, { useState, useContext } from 'react';
import { FaRegEdit, FaAlignLeft, FaRegCalendarAlt } from 'react-icons/fa'; 
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import TaskContext from '../../context/TaskContext';
import { ThemeContext } from '../../context/ThemeContext'; 

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });
  const { addTask } = useContext(TaskContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <div className={`flex items-center justify-center transition-all duration-500`}>
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white`}
      >
       {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
      </button>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>
          Add New Task
        </h2>

        <div className="mb-4 flex items-center">
          <FaRegEdit className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mr-3`} />
          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'}`}
          />
        </div>

        <div className="mb-4 flex items-start">
          <FaAlignLeft className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mr-3`} />
          <textarea
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'}`}
          ></textarea>
        </div>

        <div className="mb-6 flex items-center">
          <FaRegCalendarAlt className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mr-3`} />
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            required
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'}`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 font-bold rounded ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
