import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todo from './pages/Todo'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/todo' element={<Todo/>}/>
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App