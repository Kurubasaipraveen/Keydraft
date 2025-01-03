import React, { useState } from "react";
import "../styles/Dash.css";
import { exportToExcel } from "../utils/excelHandler";
import './sidebar';
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      branchName: "SPL - CORPORATE",
      branchCode: "C001",
      branchShortname: "SPL",
      locality: "Chennai",
      city: "CHENNAI",
      state: "TAMIL NADU",
      contactPerson: "S SRINIVASAN",
      contactPhone: "9940093856",
      panNo: "GUWYY1206P",
      gstin: "09876543456789",
      status: "Active",
    },
    {
      id: 2,
      branchName: "CHENNAI",
      branchCode: "B001",
      branchShortname: "CHN",
      locality: "Alandur(Reopened W.E.F.6.6.05)",
      city: "CHENNAI",
      state: "TAMIL NADU",
      contactPerson: "N/A",
      contactPhone: "N/A",
      panNo: "GUWYY1206P",
      gstin: "09876543456789",
      status: "Active",
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("list"); 
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [editingRow, setEditingRow] = useState(null); 
  const [editedData, setEditedData] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    branchName: "",
    branchCode: "",
    branchShortname: "",
    locality: "",
    city: "",
    state: "",
    contactPerson: "",
    contactPhone: "",
    panNo: "",
    gstin: "",
    status: "Active",
  });

  const handleNewBranchChange = (e) => {
    const { name, value } = e.target;
    setNewBranch((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBranch = () => {
    if (!newBranch.branchName || !newBranch.branchCode) {
      alert("Branch Name and Code are required!");
      return;
    }
    setRows((prevRows) => [
      ...prevRows,
      { ...newBranch, id: prevRows.length + 1 },
    ]);
    setNewBranch({
      branchName: "",
      branchCode: "",
      branchShortname: "",
      locality: "",
      city: "",
      state: "",
      contactPerson: "",
      contactPhone: "",
      panNo: "",
      gstin: "",
      status: "Active",
    });
    setIsAddModalOpen(false);
  };
  // Search Functionality
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Data:", editedData);
    setEditingRow(null); // Close the modal after saving
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleView = (id) => {
    console.log("View action for ID:", id);
  };

  const handleReset = (id) => {
    console.log("Reset action for ID:", id);
  };

  // Sorting Functionality
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = React.useMemo(() => {
    let sortableRows = [...filteredRows];
    if (sortConfig.key) {
      sortableRows.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRows;
  }, [filteredRows, sortConfig]);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);

  // Pagination Handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowsPerPageChange = (e) => setRowsPerPage(Number(e.target.value));

  // Toggle Full-Screen
  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };
  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };
  const navigate=useNavigate()
  const logoutBtn=()=>{
    navigate('/')
  }

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="first-container">
      <div className="header-image">
          <img
            src="http://digitrac.keydraft.com/images/avatars/1.png"
            className="image-logo"
            alt="User Avatar"
            onClick={toggleLogout}
            style={{ cursor: "pointer" }}
          />
          <span>Praveen</span>
          {showLogout && (
            <button
              className="logout-button"
              onClick={logoutBtn}
            >
              Logout
            </button>
          )}
        </div>
        <div className="sidebar-dash">
           <Sidebar />
        </div>
    <div className={`dashboard-container ${isFullScreen ? "fullscreen" : ""}`}>
        <div className="middle-container">
      <h4>Branch Management</h4>
      {/* Edit option */}
      {editingRow && (
        <div className="modal-background">
          <div className="edit-form-modal">
            <h5>Edit Branch</h5>
            <label>
              Branch Name:
              <input
                type="text"
                name="branchName"
                value={editedData.branchName}
                onChange={handleChange}
              />
            </label>
            <label>
              Branch Code:
              <input
                type="text"
                name="branchCode"
                value={editedData.branchCode}
                onChange={handleChange}
              />
            </label>
            <label>
            Branch Short Name:
              <input
                type="text"
                name="branchShortname"
                value={editedData.branchShortname}
                onChange={handleChange}
              />
            </label>
            <label>
            Locality:
              <input
                type="text"
                name="locality"
                value={editedData.locality}
                onChange={handleChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={editedData.city}
                onChange={handleChange}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={editedData.state}
                onChange={handleChange}
              />
            </label>
            <label>
              contactPerson:
              <input
                type="text"
                name="contactPerson"
                value={editedData.contactPerson}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="contactPhone"
                value={editedData.contactPhone}
                onChange={handleChange}
              />
            </label>
            <label>
              GSTIN
              <input
                type="text"
                name="gstin"
                value={editedData.gstin}
                onChange={handleChange}
              />
            </label>
            <label>
              Status
              <input
                type="text"
                name="status"
                value={editedData.status}
                onChange={handleChange}
              />
            </label>
            
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* New branch Option */}
      {isAddModalOpen && (
            <div className="modal-background">
              <div className="modal">
                <h5>Add New Branch</h5>
                <label className="model-open">
                  Branch Name:
                  <input
                    type="text"
                    name="branchName"
                    value={newBranch.branchName}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  Branch Code:
                  <input
                    type="text"
                    name="branchCode"
                    value={newBranch.branchCode}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  Branch Shortname:
                  <input
                    type="text"
                    name="branchShortname"
                    value={newBranch.branchShortname}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  Locality:
                  <input
                    type="text"
                    name="locality"
                    value={newBranch.locality}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  City:
                  <input
                    type="text"
                    name="city"
                    value={newBranch.city}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  State:
                  <input
                    type="text"
                    name="state"
                    value={newBranch.state}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  Contact Person:
                  <input
                    type="text"
                    name="contactPerson"
                    value={newBranch.contactPerson}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  Contact Phone:
                  <input
                    type="text"
                    name="contactPhone"
                    value={newBranch.contactPhone}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  PAN No:
                  <input
                    type="text"
                    name="panNo"
                    value={newBranch.panNo}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <label className="model-open">
                  GSTIN:
                  <input
                    type="text"
                    name="gstin"
                    value={newBranch.gstin}
                    onChange={handleNewBranchChange}
                  />
                </label>
                <div className="modal-actions">
                  <button onClick={handleAddBranch}>Save</button>
                  <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
      <div className="toolbar">
        {/* Left Side */}
        <div className="toolbar-left">
          <button className="add-branch-button" onClick={() => setIsAddModalOpen(true)}>
            <i className="bi bi-plus-circle-fill"></i>
          </button>
          <div className="search-bar">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="toolbar-right">
        <div>
            <label htmlFor="fileInput" className="action-button">
              <i className="bi bi-arrow-bar-up"></i> 
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  console.log("File selected:", e.target.files[0].name);
                }
              }}
            />
          </div>
          <button
            onClick={() => exportToExcel(rows, "branches.xlsx", "Branches")}
            className="excel-button"
          >
            <i className="bi bi-file-earmark-spreadsheet-fill"></i>
          </button>
          <button title="Show/Hide Columns" className="action-button">
            <i className="bi bi-layout-three-columns"></i>
          </button>
          <button title="Fullscreen" className="action-button" onClick={toggleFullScreen}>
            <i className="bi bi-arrows-fullscreen"></i>
          </button>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="action-button"
          >
            <i className={`bi bi-view-${viewMode === "list" ? "list" : "grid"}`}></i>
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className={`table-container ${viewMode}`}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => requestSort("branchName")}>Branch Name</th>
              <th onClick={() => requestSort("branchCode")}>Branch Code</th>
              <th onClick={() => requestSort("branchShortname")}>Branch Short Name</th>
              <th onClick={() => requestSort("locality")}>Locality</th>
              <th onClick={() => requestSort("city")}>City</th>
              <th onClick={() => requestSort("state")}>State</th>
              <th onClick={() => requestSort("contactPerson")}>Contact Person</th>
              <th onClick={() => requestSort("contactPhone")}>Phone</th>
              <th onClick={() => requestSort("panNo")}>Pan No</th>
              <th onClick={() => requestSort("gstin")}>GSTIN</th>
              <th onClick={() => requestSort("status")}>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.branchName}</td>
                <td>{row.branchCode}</td>
                <td>{row.branchShortname}</td>
                <td>{row.locality}</td>
                <td>{row.city}</td>
                <td>{row.state}</td>
                <td>{row.contactPerson}</td>
                <td>{row.contactPhone}</td>
                <td>{row.panNo}</td>
                <td>{row.gstin}</td>
                <td>{row.status}</td>
                <td>
                  <button onClick={() => handleEdit(row)} title="Edit" className="btn-action">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button onClick={() => handleView(row.id)} title="View" className="btn-action">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button onClick={() => handleReset(row.id)} title="Reset" className="btn-action">
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </button>
                  <button onClick={() => setRows(rows.filter((r) => r.id !== row.id))} className="btn-action">
                    <i className="bi bi-x-square-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="last-pagination">
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-button ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
      </div>

      {/* Rows per page selector */}
      <div className="rows-per-page">
        <label>Rows per page:</label>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[5, 10, 15, 20, 25, 50, 100].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
