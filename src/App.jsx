import './App.css'
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import CursorGlow from './CursorGlow'
function App() {

  return (
    <div className='app'>
      <CursorGlow />
      <Navbar />
      <Hero/>
    </div>
  )
}

export default App
