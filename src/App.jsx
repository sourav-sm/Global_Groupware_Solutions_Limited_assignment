import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Auth/login';
import UserList from './Routes/useList';
import './App.css'

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/users' element={<UserList/>}/>
        </Routes>
      </Router>
      
  )
}

export default App