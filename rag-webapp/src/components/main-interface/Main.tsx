import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import { Prompt } from "./prompt/prompt";
import "../../css/main-interface/main.css";
import { Historical } from "./historical/Historical";

export function Main() {
    const [userId, setUserId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId != null) {
            setUserId(parseInt(storedUserId, 10));
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="left-side">
                    <Historical userId={userId ?? 0} />
                </div>
                <div className="right-side">
                    <Prompt />
                </div>
            </div>
        </>
    );
}
