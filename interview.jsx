import React, { useEffect, useState } from "react";

// Reusable pagination hook
function usePagination(data = [], itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset page when data / itemsPerPage changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    currentData,
    setCurrentPage: handlePageChange,
  };
}

// Reusable Pagination component
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Only show up to 5 page buttons at a time
  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const res = [];
    for (let i = start; i <= end; i++) res.push(i);
    return res;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: 16 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          style={{ fontWeight: currentPage === n ? "bold" : "normal" }}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Use a public API endpoint for demonstration
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const {
    currentPage,
    totalPages,
    currentData,
    setCurrentPage,
  } = usePagination(data, itemsPerPage);

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <h2>Client-side Pagination (Reusable)</h2>
      <label>
        Items per page:{" "}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {currentData.map((item) => (
          <li key={item.id}>
            <strong>{item.id}.</strong> {item.title}
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
