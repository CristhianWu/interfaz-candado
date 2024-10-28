import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import LoginScreen from './components/loginScreen';
import MainScreen from './components/mainScreen';
import PrivateRoute from './auth/privateRoute';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='/home' element={
            <PrivateRoute>
              <MainScreen/>
            </PrivateRoute>
            }/>
          <Route path='/' element={<LoginScreen/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
