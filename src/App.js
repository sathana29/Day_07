import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Registration from './components/Registration';
import Navbar from './components/Navbar';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
