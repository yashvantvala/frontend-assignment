import React, { useState } from "react";

const TableContent = {
  header: ["S.No.", "Percentage funded", "Amount pledged"],
  rows: ["s.no", "percentage.funded", "amt.pledged"],
};

const Table = (props) => {
  const { data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemCountPerPage = 5;
  const totalPages = Math.ceil(data.length / itemCountPerPage);

  const lastIndex = currentPage * itemCountPerPage;
  const firstIndex = lastIndex - itemCountPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <table className="data-table" aria-label="Data Table">
        <thead className="data-header">
          <tr className="">
            {data.length > 0 &&
              TableContent.header.map((key) => (
                <th key={key} scope="col">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="data-content">
          {currentItems.map((item, index) => (
            <tr key={index}>
              {TableContent.rows.map((key, idx) => (
                <td key={idx}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-wrapper">
        <button
          className="pagination-button"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          aria-label="Previous"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;

Table.defaultProps = {
  data: [],
};
