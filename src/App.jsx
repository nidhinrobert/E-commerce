
import React from 'react';
import './App.css'
import MainRouter from './components/Layout'
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
    <MainRouter/>
       <ToastContainer/>
    </>
  )
}

export default App
