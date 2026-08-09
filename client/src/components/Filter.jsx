import { useState, useEffect } from "react"

function Filter(){
    const [isOpen, setIsOpen]=useState(false);
    const[selectedFilter, setSelectedFilter]=useState("Filter")

    const Filters = ["Pending", "Settled", "Failed"];

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        setIsOpen(false);
    }

    return(
    <div className="filter-container">
        <button
            className="filter-button"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span>{selectedFilter}</span>

            <span className={`arrow ${isOpen ? "rotate" : ""}`}>
            ▼
            </span>
        </button>

        {isOpen && (
            <div className="filter-menu">
            {Filters.map((filter) => (
                <button
                key={filter}
                className="filter-option"
                onClick={() => handleFilterClick(filter)}
                >
                {filter}
                </button>
            ))}
            </div>
        )}
    </div>
  );
    
}

export default Filter;