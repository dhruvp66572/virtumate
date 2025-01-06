import './App.css'
import Cover from './pages/Cover'
import HomePage from './pages/HomePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login'; 
import Register from './components/auth/Register';
import { Home } from 'lucide-react';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      {/* <h1 className="text-center text-4xl font-bold text-blue-500">
        Virtumate
      </h1> */}
      {/* <div>
       <Cover/>
    </div> */}
   
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/home" element={<HomePage />} />  
        <Route path="/dashboard" element={<Dashboard />} />  
        
      </Routes>
   
    </>
  )
}

export default App
