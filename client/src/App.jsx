import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import PCCForm from './PCCForm'
import PCCStatus from './PCCStatus'
import Report from './Report'
// import './PCCForm.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <>
      <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/PCCForm" element={<PCCForm />}></Route>
            <Route path="/PCCStatus" element={<PCCStatus/>}></Route>
            <Route path="/report" element={<Report />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
