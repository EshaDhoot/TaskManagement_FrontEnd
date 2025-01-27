import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../../context/TaskContext';
import { ThemeContext } from '../../context/ThemeContext';
import { FaTrashAlt, FaCheckCircle, FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TaskList = () => {
  const { tasks, deleteTask, updateTaskStatus, fetchTasks } = useContext(TaskContext);
  const { darkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByCompleted, setSortByCompleted] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    // fetchTasks(searchTerm, '', newOrder);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByCompletedChange = (e) => {
    const value = e.target.value;
    if (value === 'completed') {
      setSortByCompleted('true');
    } else if (value === 'pending') {
      setSortByCompleted('false');
    } else {
      setSortByCompleted('');
    }
  };

  useEffect(() => {
    fetchTasks(searchTerm, sortOrder, sortByCompleted);
  }, [searchTerm, sortOrder, sortByCompleted]);

  return (
    <div
      className={`p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-8 transition-all duration-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
    >
      <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>
        Task List
      </h2>


      <div className="relative ">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 w-full rounded-lg border pl-10"
        />
      </div>
      <div className="flex mb-4 mt-4 space-x-4">
      <button
          onClick={toggleSortOrder}
          className={`flex items-center px-4 py-2 text-sm font-bold rounded transition-all ${darkMode
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Sort by Due Date
          {sortOrder === 'asc' ? (
            <FaArrowUp className="ml-2" />
          ) : (
            <FaArrowDown className="ml-2" />
          )}
        </button>
        <select
          value={sortByCompleted}
          onChange={handleSortByCompletedChange}
          className="p-2 w-1/2 rounded-lg border"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {tasks.length === 0 ? (
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No tasks to display.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 mb-4 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
              }`}
          >
            <h3
              className={`text-xl font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-500'} ${task.completed ? 'line-through text-gray-500' : ''
                }`}
            >
              {task.title}
            </h3>
            <p className="mb-2">{task.description}</p>
            <small className={`block mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </small>

            <div className="flex items-center">
              <button
                onClick={() => updateTaskStatus(task._id, task.completed)}
                className={`mr-4 flex items-center px-4 py-2 text-sm font-bold rounded transition-all ${darkMode
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
              >
                <FaCheckCircle className="mr-2" />
                {task.completed ? 'Completed' : 'Mark as Completed'}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className={`flex items-center px-4 py-2 text-sm font-bold rounded transition-all ${darkMode
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
              >
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
