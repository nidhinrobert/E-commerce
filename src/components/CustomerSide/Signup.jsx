import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./User.css"

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/user/signup', {
        name: name,
        email: email,
        password: password
      });
      if(response.data && response.data.token){
      localStorage.setItem('token',response.data.token);
      navigate("/")
    }else {
      
      console.error('Authentication failed');
    
    }
      console.log('User signed up:', response.data);
      
     
      setName('');
      setEmail('');
      setPassword('');
      
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div className='signup-container'>
            <h1>Sign Up</h1>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input  type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
                <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <button className='login' type='submit'>Sign Up</button>
            </form>
            <p className='signin-link'>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
  );
};

export default Signup;
