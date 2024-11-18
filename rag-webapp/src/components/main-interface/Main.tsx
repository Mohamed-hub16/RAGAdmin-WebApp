import Header from "./header/Header";
import {Alerts} from "./alerts/Alerts";
import "../../css/main-interface/main.css"

export function Main() {
    return (
        <>
            <Header/>
            <div className="left-side">
                <Alerts/>
            </div>
        </>
    );
}
