import { useState } from "react";

function Filter({ selectedFilter, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const Filters = ["All", "Pending", "Settled", "Failed"];

  const handleFilterClick = (filter) => {
    onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedFilter}</span>
        <span className={`arrow ${isOpen ? "rotate" : ""}`}>▼</span>
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