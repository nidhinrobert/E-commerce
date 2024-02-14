import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/admin/login`, {
        email: email,
        password: password
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/adminpanel');
      } else {
        
        console.error('Authentication failed');
       
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error occurred during login:', error);
      
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
