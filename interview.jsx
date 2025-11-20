import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetch(" ")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage // fixed: typo (itemsperPage -> itemsPerPage)
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Client-side Pagination</h2>

      <ul>
        {currentData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n + 1)}
            style={{
              fontWeight: currentPage === n + 1 ? "bold" : "normal",
            }}
          >
            {n + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
