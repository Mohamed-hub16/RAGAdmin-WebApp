import React, { useRef, useState, useEffect } from "react";
import "../../../css/main-interface/alerts.css";

export function Alerts() {
    const filterButtonRef = useRef<HTMLButtonElement | null>(null);
    const filterContainerRef = useRef<HTMLDivElement | null>(null);

    const [filtersActive, setFiltersActive] = useState(false);
    const [isAnyFilterChecked, setIsAnyFilterChecked] = useState(false);

    const toggleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setFiltersActive(!filtersActive);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setFiltersActive(false);
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleFilterClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleCheckboxChange = () => {
        const inputs = filterContainerRef.current?.querySelectorAll<HTMLInputElement>("input");
        const isChecked = Array.from(inputs || []).some((input) => input.checked);
        setIsAnyFilterChecked(isChecked);
    };

    return (
        <div className="alerts-container">
            <div className="alert-start">
                <h4 className="alert-h4">Alertes à traiter</h4>
                <div className="filters-container">
                    <button
                        id="filter-button"
                        className={`button ${isAnyFilterChecked ? "button--highlight" : ""}`}
                        ref={filterButtonRef}
                        onClick={toggleFilters}
                    >
                        Filter
                    </button>
                    <div
                        id="filter-container"
                        className={`filters ${filtersActive ? "filters--active" : ""}`}
                        ref={filterContainerRef}
                        onClick={handleFilterClick}
                    >
                        <ul className="filters__list">
                            <li>
                                <input id="f1" type="checkbox" onChange={handleCheckboxChange} />
                                <label htmlFor="f1">Filter 1</label>
                            </li>
                            <li>
                                <input id="f2" type="checkbox" onChange={handleCheckboxChange} />
                                <label htmlFor="f2">Filter 2</label>
                            </li>
                            <li>
                                <input id="f3" type="checkbox" onChange={handleCheckboxChange} />
                                <label htmlFor="f3">Filter 3</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="alert-div">
                <div className="alerts-block">
                    <span className="priority-number">1</span>
                    <span className="alert-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac dui nunc. Nunc iaculis turpis sit amet libero vehicula, rhoncus dapibus erat maximus. Mauris sed odio ante. Aenean sagittis vehicula vulputate. Phasellus aliquet non purus id pharetra. Duis gravida urna vel ullamcorper venenatis. Nulla viverra eu lorem sagittis dignissim.</span>
                </div>
                <div className="alerts-block">
                    <span className="priority-number">1</span>
                    <span className="alert-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac dui nunc. Nunc iaculis turpis sit amet libero vehicula, rhoncus dapibus erat maximus. Mauris sed odio ante. Aenean sagittis vehicula vulputate. Phasellus aliquet non purus id pharetra. Duis gravida urna vel ullamcorper venenatis. Nulla viverra eu lorem sagittis dignissim.</span>
                </div>
                <div className="alerts-block">
                    <span className="priority-number">1</span>
                    <span className="alert-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac dui nunc. Nunc iaculis turpis sit amet libero vehicula, rhoncus dapibus erat maximus. Mauris sed odio ante. Aenean sagittis vehicula vulputate. Phasellus aliquet non purus id pharetra. Duis gravida urna vel ullamcorper venenatis. Nulla viverra eu lorem sagittis dignissim.</span>
                </div>

                <div className="pagination-button">
                    <button className="back-button">{"<"}</button>
                    <span className="actual-page">1 - 5</span>
                    <button className="next-button">{">"}</button>
                </div>
            </div>
        </div>
    );
}