//frontend/src/App.jsx
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from "./Components/Home";
import { User } from "./Components/User";
import {Header} from './Pages/Header.jsx';
export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
// http://localhost:8080