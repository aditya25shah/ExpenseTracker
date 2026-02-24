import './App.css'
import React from 'react'
import Navbar from './Navbar'
import CursorGlow from './CursorGlow'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'
import Profile from './pages/Profile'

function App() {
  return (
    <div className='app'>
      <CursorGlow />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App