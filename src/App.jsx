import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import '../src/components/Navbar.jsx'
import NavView from './views/NavView.jsx'
import Characters from './views/Characters.jsx'
import Planets from './views/Planets.jsx'
import Ships from './views/Ships.jsx'

function App() {

  return (
    <>
      <div>
        <NavView />
        <Characters />
        <Planets />
        <Ships />
      </div>
    </>
  )
}

export default App
