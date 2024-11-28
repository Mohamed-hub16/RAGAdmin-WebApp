import Header from "./header";
import React from "react";
import '../../css/register-interface/register.css';
import RegisterBlock from "./register-block";

export function Register() {
    return(
        <>
            <Header/>
            <div className="parent-container">
                <RegisterBlock />
            </div>
        </>
    )
}