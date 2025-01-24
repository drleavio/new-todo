import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todo from './pages/Todo'
import Login from './pages/Login'

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/todo' element={<Todo/>}/>
                <Route path='/' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App