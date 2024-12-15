import { useState } from 'react'
import { Pokemon } from './Pokemon'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokemon/>
    </>
  )
}

export default App
