
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Sidebar.css';
import { FaPlus } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { RiVipDiamondLine } from "react-icons/ri";
import { TbBoxMultiple } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import icon from '../../assets/QuesLogo.png';
import { GetCurrentUser } from '../../apicalls/users';
import user from '../../assets/user.png';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userDetails, setUserDetails] = useState(null);  
  const navigate = useNavigate();
  const { projectName } = useParams();

  const handleClick = (index, navItem) => {
    setActiveIndex(index);
    handleNavigation(navItem);
  };

  const handleAccount = () => {
    navigate('/AccountInfo');
  };

  const handleNavigation = (navItem) => {
    const path = projectName ? `/upload/${projectName}/${navItem}` : `/upload/${navItem}`;
    navigate(path);
  };

  const values = [
    { icon: <FaPlus className='icons' />, text: 'Add your Podcast(s)', navItem: 'Add your podcast' },
    { icon: <FiEdit2 className='icons' />, text: 'Create & Repurpose', navItem: 'Create & Repurpose' },
    { icon: <TbBoxMultiple className='icons' />, text: 'Podcast Widget', navItem: 'Podcast Widget' },
    { icon: <RiVipDiamondLine className='icons' />, text: 'Upgrade', navItem: 'Upgrade' },
  ];

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await GetCurrentUser();
      if (currentUser.success) {
        setUserDetails(currentUser);  
        
      } else {
        throw new Error('Failed to fetch user details');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  

  return (
    <div>
      <div className="sidebar">
        <div className="icon-image">
          <img src={icon} alt="icon" />
        </div>
        <div className="containerbox">
          <div className="container-value">
            {values.map((item, index) => (
              <div
                key={index}
                className={`values ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index, item.navItem)}
              >
                {item.icon}
                <span className='text'>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="user-profile">
          {userDetails && userDetails.data ? (  
            <div className="username" onClick={handleAccount}>
              <img src={user} alt="user"/>
              <div>
              <div className='name'>{userDetails.data.name}</div>
              <div className='email'>{userDetails.data.email}</div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>  
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
