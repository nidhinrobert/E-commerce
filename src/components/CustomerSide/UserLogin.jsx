import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/user/signin', {
                email: email,
                password: password
            });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
                navigate("/")
            } else {

                console.error('Authentication failed');

            }
            console.log('User signed in:', response.data);

           

        } catch (error) {
            console.error('Signin error:', error);
            setError(error.response ? error.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div className='Signin'>
            <h1>LogIn</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <button type='submit'>LogIn</button> 
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default UserLogin;
