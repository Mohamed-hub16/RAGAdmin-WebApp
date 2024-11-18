import Header from "./header";
import ConnectionBlock from "./connection-block";
import React from "react";
import '../../css/log-interface/log.css';



export function Log() {
    return (
        <>
            <Header />
            <div className="parent-container">
                <ConnectionBlock />
            </div>
        </>
    );
}
