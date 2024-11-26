import Header from "./header/Header";
import {Prompt} from "./prompt/prompt";
import "../../css/main-interface/main.css";
import {Historical} from "./historical/Historical";

import "../../css/main-interface/main.css"

export function Main() {
    return (
        <>
            <Header/>
            <div className="main-container">
                <div className="left-side">
                    <Historical/>
                </div>
                <div className="right-side">
                    <Prompt/>
                </div>
            </div>
        </>
    );
}
