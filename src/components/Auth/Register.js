import React, { useState, useContext } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import AuthContext from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext'; 

const Register = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const { register } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext); 

  const handleSubmit =  (e) => {
    e.preventDefault();
    register(userData);
    setUserData({ name: '', email: '', password: '' });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen transition-all duration-500` }>
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
          Create an Account
        </h2>
        <div className="mb-4">
          <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 font-bold rounded ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Register
        </button>
        <p className={`mt-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <a
            href="/login"
            className={`text-blue-500 hover:underline hover:text-blue-700 ${darkMode ? 'text-blue-300' : ''}`}
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
