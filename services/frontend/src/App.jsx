import { useState } from 'react'
import MainScreen from './components/mainScreen';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainScreen/>
  )
}

export default App
