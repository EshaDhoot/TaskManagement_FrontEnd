import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { ThemeContext } from '../context/ThemeContext'; 

const Home = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext); 

  return (
    <div className="flex items-center justify-center min-h-screen transition-all duration-500">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg text-gray-800 dark:text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-500">Task Management App</h1>
        <p className="text-lg mb-6">
          Organize your tasks efficiently. Login or register to start managing your tasks today!
        </p>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
        >
          {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
        </button>

        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block px-6 py-3 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block px-6 py-3 font-medium text-white bg-green-500 hover:bg-green-600 rounded-full transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
{/* <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  This div will change its background and text color based on the theme.
</div> */}
