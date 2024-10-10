import React, { useRef, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import './Edit.css'
import { IoMdArrowRoundBack } from "react-icons/io"
import { useParams } from 'react-router-dom'
import { editEpisode, GetEpisodeById } from '../../apicalls/episodes'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

function Edit() {
    const { projectName, navItem, episodeId } = useParams();
    const [episodeDetails, setEpisodeDetail] = useState(null);
    const [textcontent, setTextcontent] = useState("");
    const [editable, setEditable] = useState(false);
    const textareaRef = useRef(null);
    const navigate=useNavigate();
    console.log("projectName, navItem, episodeId", projectName, navItem, episodeId)
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/register')
    }

    const gettingEpisode = async (episodeId) => {
        try {
            const episode = await GetEpisodeById(episodeId);
            if (episode.success) {
                setEpisodeDetail(episode.data);
                setTextcontent(episode.data.link)

            } else {
                console.log("Failed to fetch episode details");
            }
        } catch (error) {
            console.log('Error fetching episode details:', error);
        }
    }



    useEffect(() => {
        gettingEpisode(episodeId);
    }, [])
    const handleEditClick = () => {
        setEditable(true);
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.selectionStart = textareaRef.current.value.length;
                textareaRef.current.selectionEnd = textareaRef.current.value.length;
            }
        }, 0);
    };

    const handleMoveBack=()=>{
        navigate(`/upload/${projectName}/${navItem}`)
    }
    const handleDiscard=()=>{
        setTextcontent(episodeDetails.link);
        setEditable(false);
    }
    const handleSaveClick = async () => {
        try {
            const updatedData = { link: textcontent };
            const response = await editEpisode( episodeId,updatedData);
            if (response.success) {
                setEditable(false);
                message.success('Episode TypeScript/Link updated successfully');
            } else {
                alert('Failed to update episode');
            }
        } catch (error) {
            console.error('Error updating episode:', error);
            alert('An error occurred while updating the episode');
        }
    };
    return (
        <div className='main-container'>
            <Sidebar />
            <div className='rightside-container'>
                <div className='upload-uppermost'>
                    <div className='uppermostleft'>
                        <GoHome size={25} />
                        <div className='home'>
                            <div className='starting-path'>Home page / {projectName} /</div>
                            <div className='ending-path'>{navItem}</div>
                        </div>
                    </div>
                    <div className='uppermostright'>
                        <IoIosNotificationsOutline size={30} />
                        <FiLogOut size={30} onClick={handleLogout} style={{ cursor: 'pointer' }} />

                    </div>
                </div>
                {
                    navItem === 'Add your podcast' && (<div className='second-portion'>
                        <div className='edit-heading'>
                            <div className='edit-text-container'>
                                <IoMdArrowRoundBack size={30} onClick={handleMoveBack} style={{cursor:'pointer'}}/>
                                <div className='edit-text'> Edit TransScript</div>
                            </div>
                            {
                                editable?(<div className='editable-true-button'>
                                    <button onClick={handleSaveClick}>Save</button>
                                    <button onClick={handleDiscard}>Discard</button>
                                </div>):( <div className='edit-button'>
                                    <button onClick={handleEditClick}>Edit</button>
                                </div>)
                            }
                           
                        </div>
                        <div className='inputbox-portion'>
                            <textarea placeholder="Your Transcript..."
                                value={textcontent}
                                readOnly={!editable}
                                ref={textareaRef}
                                onChange={(e) => setTextcontent(e.target.value)} />
                        </div>
                    </div>)
                }


            </div>

        </div>
    )
}

export default Edit