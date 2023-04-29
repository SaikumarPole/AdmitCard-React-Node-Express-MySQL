import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Registration from './components/registration_component'
import Registered from './components/registration_completed_component'
function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Registration />} />
              <Route exact path="/registered/:id" element={<Registered />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
