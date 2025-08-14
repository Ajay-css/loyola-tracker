import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import CreateStudent from './components/CreateStudent/CreateStudent'
import EditStudent from './components/Edit Student/EditStudent'
import NotFound from './components/NotFound/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Details />} />
        <Route path='/add-student' element={<CreateStudent />} />
        <Route path='/edit-student/:id' element={<EditStudent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App