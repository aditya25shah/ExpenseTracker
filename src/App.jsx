import './App.css'
import React from 'react'
import { useState } from 'react'
import Signup from './pages/Signup'
import CursorGlow from './CursorGlow'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navbar from './Navbar'
function App() {
  return (
    <div className='app'>
      <CursorGlow />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App