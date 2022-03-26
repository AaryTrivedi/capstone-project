import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

export default function LandingPage() {
    return (
        <header style={HeaderStyle}>
            
            <h1 className="main-title text-center">Login / Register page</h1>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button" id="reg_btn"><span>Log in</span></button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>Register </span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    backgroundSize: "cover"
}