import React from "react";
// @ts-ignore
import "../../../css/main-interface/header.css";

export function UserHeader() {
    return (
        <div className="user-info">
            <img className="avatar-img" src={"https://via.placeholder.com/30"} alt="user-avatar" />
            <div className="user-details">
                <span className="user-span">User</span>
                <span className="state-span">State</span>
            </div>
        </div>
    );
}
