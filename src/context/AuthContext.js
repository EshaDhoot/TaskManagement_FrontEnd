import React, { createContext, useState, useEffect } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; 
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token'));

  const login = async (credentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      setToken(response.data.data);
      Cookies.set('token', token, { expires: 7 });
      toast.success(response.data.message); 
      return true;
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      toast.error(error.response.data.message);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      toast.success(response.data.message); 
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  
  const logout = () => {
    setToken(null);
    Cookies.remove('token');
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContext;
