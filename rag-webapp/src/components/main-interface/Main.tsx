import Header from "./header/Header";
import "../../css/main-interface/main.css"
import {Historical} from "./historical/Historical";

export function Main() {
    return (
        <>
            <Header/>
            <div className="left-side">
                <Historical/>
            </div>
        </>
    );
}
