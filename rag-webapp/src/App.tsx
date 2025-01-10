import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Log } from "./components/log-interface/log";
import { Main } from "./components/main-interface/Main";
import { Register } from "./components/register-interface/register";
import PrivateRouteMainPage from './components/private-route/PrivateRouteMainPage';
import PrivateRouteLogin from "./components/private-route/PrivateRouteLogin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={
                    <PrivateRouteLogin>
                        <Log />
                    </PrivateRouteLogin>
                } />

                <Route path="/signup" element={
                    <PrivateRouteLogin>
                        <Register />
                    </PrivateRouteLogin>
                } />

                <Route
                    path="/main"
                    element={
                        <PrivateRouteMainPage>
                            <Main />
                        </PrivateRouteMainPage>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
