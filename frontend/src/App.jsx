import React from 'react'
import { Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Person from './components/Person/Person'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/person' element={<Person />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App