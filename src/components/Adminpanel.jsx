import React, { useEffect } from 'react'
import Header from "../components/AdminSide/Header"
import Content from './AdminSide/Content'
import { useNavigate } from 'react-router-dom';


const Adminpanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Header/>
      <Content/>
    </div>
  )
}

export default Adminpanel