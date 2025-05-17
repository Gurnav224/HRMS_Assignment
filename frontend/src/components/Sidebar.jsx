import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './sidebar.css'
import { useState } from 'react';
import Modal from './logout_modal/Modal'; 
import {logout} from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    
  const [open , setOpen] = useState(false);

  const dispatch = useDispatch();
  
 const handleLogout = () => {
  setOpen(false);
  dispatch(logout())
}
 

  return (
  <aside className="sidebar">
      <Logo />
      <div className="search-container">
        <input type="text" className="search-box" placeholder="Search" />
      </div>
      
      <div className="section-title">Recruitment</div>
      
      <Link to="/candidates" className="nav-link">
        <div className={`menu-item ${currentPath === '/candidates' ? 'active' : ''}`}>
          <div className="menu-icon icon-candidates"></div>
          <span>Candidates</span>
        </div>
      </Link>
      
      <div className="section-title">Organization</div>
      
      <Link to="/employees" className="nav-link">
        <div className={`menu-item ${currentPath === '/employees' ? 'active' : ''}`}>
          <div className="menu-icon icon-employees"></div>
          <span>Employees</span>
        </div>
      </Link>
      
      <Link to="/attendance" className="nav-link">
        <div className={`menu-item ${currentPath === '/attendance' ? 'active' : ''}`}>
          <div className="menu-icon icon-attendance"></div>
          <span>Attendance</span>
        </div>
      </Link>
      
      <Link to="/leaves" className="nav-link">
        <div className={`menu-item ${currentPath === '/leaves' ? 'active' : ''}`}>
          <div className="menu-icon icon-leaves"></div>
          <span>Leaves</span>
        </div>
      </Link>
      
      <div className="section-title">Others</div>

      {
      open && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <h2>Logout Confirmation</h2>
          <p>Are you sure you want to logout?</p>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={handleLogout}>Logout</button>
        </Modal>
   
      )
      }
      
      <button onClick={() => setOpen(true)}  className="nav-link logout-btn">
        <div className="menu-item">
          <div className="menu-icon icon-logout"></div>
          <span>Logout</span>
        </div>
      </button>

    </aside>
  )
}

export default Sidebar
