import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import '../src/components/Navbar.jsx'
import NavView from './views/NavView.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavView />
      </div>
    </>
  )
}

export default App
