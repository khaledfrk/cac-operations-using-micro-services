import React, { useState } from "react";
import "./styles.css";
import { ImBin, ImPencil } from "react-icons/im";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Table = (props) => {
  const { headers, tableContent, handleClick, tableType, handleEdit } = props;

  const listHeaders = headers.map((header) => {
    if (header.key === "id" || header.key === "lbz") return <></>;
    return (
      <th scope="col" key={header.key}>
        {header.value}
      </th>
    );
  });

  const handleButton = (key, entry) => {
    const value = entry.filter((element) => element[0] === key);
    handleClick(value[0][1]);
  };

  const handleEditButton = (key, entry) => {
    const value = entry.filter((element) => element[0] === key);
    handleEdit(value[0][1]);
  };

  const info = tableContent.map((content) => {
    // console.log(content)
    const entry = Object.entries(content).filter((item, index) => {
      // console.log(item)
      for (let i = 0; i < headers.length; i++) {

        if (headers[i].key === item[0]) return item[1];
      }
      return false;
    });
    // console.log(entry)
    return entry;
  });

  console.log(info)

  const listTable = info.map((entry) => (
    <tr key={entry}>
      {entry.map((element) => {
        if (element[0] === "id" || element[0] === "lbz") return <></>;
        if (element[0] === "datumPregleda") {
          return (
            <td key={element} style={{ padding: "25px 0px" }}>
              {new Date(element[1]).toLocaleDateString()}
            </td>
          );
        }

        return (
          <td key={element} style={{ padding: "25px 0px" }}>
            {element[1]}
          </td>
        );
      })}
      {tableType === "patients" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIconBlue"
              onClick={() => handleEditButton("lbp", entry)}
            >
              <ImPencil />
            </button>
          </td>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIcon"
              onClick={() => handleButton("lbp", entry)}
            >
              <ImBin />
            </button>
          </td>
        </>
      ) : tableType === "employees" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIconBlue"
              onClick={() => handleEditButton("lbz", entry)}
            >
              <ImPencil />
            </button>
          </td>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIcon"
              onClick={() => handleButton("lbz", entry)}
            >
              <ImBin />
            </button>
          </td>
        </>
      ) : (
        <></>
      )}
    </tr>
  ));
  const numberOfItems = listTable.length;
  const numberPerPage = 6;
  const pageLimit = 1;
  const numberOfPages = Math.ceil(numberOfItems / numberPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <div>
      <div className="responsivnes">
        <table className=" myTable table table-hover table-bordered">
          <thead className="header">
            <tr>
              {listHeaders}
              {(tableType === "patients" || tableType === "employees") && (
                <>
                  <th></th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="familyFix">
            {listTable.slice(trimStart, trimEnd)}
          </tbody>
        </table>
        <div>
          <nav className="myPagination" aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  onClick={goToPreviousPage}
                  className={`prev myPagButton ${
                    currentPage === 1 ? "disabled" : null
                  }`}
                >
                  <GrFormPrevious />
                </button>
              </li>
              <li className="page-item">
                {getPaginationGroup().map((item, index) => (
                  <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem myPagButton ${
                      currentPage === item ? "active" : null
                    }`}
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </li>
              <li className="page-item">
                <button
                  onClick={goToNextPage}
                  className={`next myPagButton ${
                    currentPage === numberOfPages ? "disabled" : null
                  }`}
                >
                  <GrFormNext />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Table;
