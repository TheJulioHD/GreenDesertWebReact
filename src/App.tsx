import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router';
import {AppTheme} from './Theme/AppTheme';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <AppTheme>
        <Router/>

      </AppTheme>
    </BrowserRouter>
  )
}

export default App
