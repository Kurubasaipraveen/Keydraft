import React, { useState } from "react";
import "../styles/sidebar.css"; 

const Sidebar = () => {
  const [showMastersOptions, setShowMastersOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Branch');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const handleMastersClick = () => {
    setShowMastersOptions(!showMastersOptions); 
  };

  const handleSubmenuClick = (option) => {
    setSelectedOption(option); 
  };
 // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} 
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => { if (!isSidebarOpen) setIsSidebarOpen(false); }} 
      >
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <i className={`bi bi-arrow-${isSidebarOpen ? 'left' : 'right'}`}></i> 
        </div>

        <div className="sidebar-item">
          {isSidebarOpen ? (
            <img
              src="http://digitrac.keydraft.com/images/logos/digitrac_full_logo.png"
              alt="Logo"
              className="image-sidebar"
            />
          ) : (
            <span className="sidebar-icon">
              <img
                src="http://digitrac.keydraft.com/images/logos/digitrac_short_logo.png"
                alt="Logo"
                className="image-default"
              />
            </span> 
          )}
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon"><i className="bi bi-house-door-fill"></i></span> {/* Home icon */}
          <span className="sidebar-item-name">Home</span>
        </div>
        
        <div className="sidebar-item" onClick={handleMastersClick}>
          <span className="sidebar-icon"><i className="bi bi-database-add"></i></span> {/* Masters icon */}
          <span className="sidebar-item-name">Masters</span>
        </div>
        {showMastersOptions && (
          <div className="submenu">
            <div 
              className={`submenu-item ${selectedOption === 'Branch' ? 'selected' : ''}`} 
              onClick={() => handleSubmenuClick('Branch')}
            >
              <span className="sidebar-branch"><i className="bi bi-dot"></i></span>
              <span className="sidebar-branch">Branch</span>
            </div>
          </div>
        )}
        
        <div className="sidebar-item">
          <span className="sidebar-icon"><i className="bi bi-question-square-fill"></i></span> {/* Help icon */}
          <span className="sidebar-item-name">Help</span>
        </div>
      </div>
      
      {/* Main content wrapper */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="dashboard">
          
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
