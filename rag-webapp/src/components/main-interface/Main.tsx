import Header from "./header/Header";
import {Alerts} from "./alerts/Alerts";
import {Prompt} from "./prompt/prompt";

import "../../css/main-interface/main.css"


export function Main() {
    return (
        <>
            <Header/>
            <div className="main-container">
                <div className="left-side">
                    <Alerts />
                </div>
                <div className="right-side">
                    <Prompt />
                </div>
            </div>
        </>
    );
}
