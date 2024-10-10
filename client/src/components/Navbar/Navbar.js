import React from 'react'
import './Navbar.css'
import iconimage from '../../assets/QuesLogo.png'
import setting from '../../assets/setting.png';
import notification from '../../assets/notifications.png'
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../Redux/authReducer';
 
function Navbar() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/register')
        dispatch(logout());
    }
    return (
        <div className='navbar-container'>
            <div className='content-container'>
                <div className='leftpart-navbar'>
                    <img src={iconimage} alt="icon-image"/>

                </div>
                <div className='rightpart-navbar'>
                    <img className='setting' src={setting}/>
                    <img className='notification' src={notification}/>
                    <FiLogOut size={30} className="Signoff" onClick={handleLogout} />

                </div>

            </div>

        </div>
    )
}

export default Navbar