import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Insights from './pages/Insights';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Members from './pages/Members';
import PendingApproval from './pages/PendingApproval';
import { QueryClient } from "react-query";
import Register from "@/pages/Register";

function App() {
  return (
    <QueryClient>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/founders" element={<Founders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={<Members />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </QueryClient>
  );
}

export default App;
