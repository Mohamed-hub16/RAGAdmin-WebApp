import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import {Log} from "./components/log-interface/log";
import {Main} from "./components/main-interface/Main";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Log />} />
                <Route path="/RAGAdmin" element={<Main />} />
            </Routes>
        </Router>
    );
}

export default App;
