import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from './context/UserAuthContext';


const App = () => {
    return (
        <Router>
            <UserAuthContextProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                </Routes>
            </UserAuthContextProvider>
        </Router>
    );
};

export default App;
