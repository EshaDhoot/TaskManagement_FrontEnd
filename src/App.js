import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'; 

const PrivateRoute = ({ children }) => {
  const { token, logout } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <button
        onClick={logout}
        className="p-2 bg-red-600 text-white rounded mb-4"
      >
        Logout
      </button>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                      <TaskForm />
                      <TaskList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
