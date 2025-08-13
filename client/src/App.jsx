import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import CreateStudent from './components/CreateStudent/CreateStudent'
import EditStudent from './components/Edit Student/EditStudent'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Details />} />
        <Route path='/add-student' element={<CreateStudent />} />
        <Route path='/edit-student/:id' element={<EditStudent />} />
      </Routes>
    </div>
  )
}

export default App