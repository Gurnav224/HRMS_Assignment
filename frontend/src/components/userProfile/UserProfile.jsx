import { useSelector } from 'react-redux';
import './UserProfile.css';
import userImg from './user.avif'; 
import { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa";

import { IoMdNotificationsOutline } from "react-icons/io";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector((state) => state.auth)

  return (
    <div className="user-profile-container">
      <div className="icons">
        <div className="icon-wrapper">
          <span className="notification-dot" />
          <IoMdNotificationsOutline className="icon"/>
        </div>
        <div className="icon-wrapper">
          <span className="notification-dot" />
         <FaRegEnvelope className="icon"/>
        </div>
      </div>
      <div className="avatar-wrapper" onClick={() => setOpen(!open)}>
        <img src={userImg} alt="User" className="avatar" />
        <span className="arrow">{open ? '▲' : '▼'}</span>
        {open && (
          <div className="dropdown">
            <div className="dropdown-item">{user.fullName}</div>
            <div className="dropdown-item">Edit Profile</div>
            <div className="dropdown-item">Change Password</div>
            <div className="dropdown-item">Manage Notification</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
