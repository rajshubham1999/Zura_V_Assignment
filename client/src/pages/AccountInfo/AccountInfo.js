import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { FiLogOut } from 'react-icons/fi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import './AccountInfo.css'
import profile from '../../assets/profile.png'
import finalimage from '../../assets/final.png'
import { GetCurrentUser } from '../../apicalls/users'
import { useNavigate } from 'react-router-dom'

function AccountInfo() {
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const navigate = useNavigate();
    const getUserDetails = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                console.log("userdetails=>", response.data);
                setUserName(response.data.name);
                setUserEmail(response.data.email)
            }

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/register')
    }

    useEffect(() => {
        getUserDetails();
    }, [])


    return (
        <div className='main-container'>
            <Sidebar />
            <div className='rightside-container'>
                <div className='upload-uppermost'>
                    <div className='uppermostleft'>
                        <GoHome size={25} />
                        <div className='home'>
                            <div className='starting-path'>Home page / Sample Project /</div>
                            <div className='ending-path'>Add to Podcast</div>
                        </div>
                    </div>
                    <div className='uppermostright'>
                        <IoIosNotificationsOutline size={30} />
                        <FiLogOut size={30} onClick={handleLogout} style={{ cursor: 'pointer' }} />

                    </div>
                </div>
                <div className='account-secondhalf'>
                    <div className='firstheading-half'>Account</div>
                    <div className='secondheading-half'>Setting</div>
                </div>
                <div className='account-thirdhalf'>
                    <div className='profile--image'>
                        <img src={profile} alt="profile" />
                    </div>
                    <div className='personal-details'>
                        <div className='usernamedetails'>
                            <p>Username</p>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className='useremail'>
                            <p>User-Email</p>
                            <input
                                type="text"
                                value={userEmail}
                                readOnly
                                className="non-editable"
                            />
                        </div>
                    </div>
                </div>
                <div className='fouth-half'>Subscription</div>
                <div className='finalimage'>
                    <img src={finalimage} alt="image" />
                </div>
            </div>
        </div>
    )
}

export default AccountInfo