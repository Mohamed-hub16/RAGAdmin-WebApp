import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import {Log} from "./components/log-interface/log";
import {Main} from "./components/main-interface/Main";
import {Register} from "./components/register-interface/register"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Login" element={<Log />} />
                <Route path="/RAGAdmin" element={<Main />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
