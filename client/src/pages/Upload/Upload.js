
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './Upload.css';
import { GoHome } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import youtube from '../../assets/youtube.png';
import media2 from '../../assets/media2.png';
import media3 from '../../assets/media1.png';
import uploader from '../../assets/uploader.png';
import { GetCurrentProject } from '../../apicalls/projects';
import { AddEpisode, DeleteEpisode } from '../../apicalls/episodes';
import { GetAllEpisodesOfProject } from '../../apicalls/episodes';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const { projectName, navItem } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaName, setMediaName] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [showEpisodesTable, setShowEpisodesTable] = useState(false);
  const navigate=useNavigate();

  const openModal = (media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMedia(null);
    setMediaName('');
    setMediaLink('');
  };

  const getcurrentproject = async (projectName) => {
    try {
      const response = await GetCurrentProject(projectName);
      if (response.success) {
        console.log("Project ID:", response.data);
        setProjectId(response.data);
      } else {
        console.log("Failed to fetch project");
      }
    } catch (error) {
      console.log('An error occurred while fetching the project');
    }
  };

  useEffect(() => {
    getcurrentproject(projectName)
  }, [])

  

  const fetchEpisodes = async (projectId) => {
    try {
      const response = await GetAllEpisodesOfProject(projectId);
      if (response.success) {
        const sortedEpisodes = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEpisodes(sortedEpisodes);
        setShowEpisodesTable(true);
        console.log("successfully fetch");
        console.log("episode=>", sortedEpisodes);
      } else {
        console.log('Failed to fetch episodes:', response.message);
      }
    } catch (error) {
      console.log('An error occurred while fetching the episodes');
    }
  };

  const handleUpload = async () => {

    if (!projectId || !mediaName || !mediaLink) {
      console.log('Please provide all necessary details');
      return;
    }

    const episodeData = {
      name: mediaName,
      projectId,
      link: mediaLink,
    };

    try {
      const response = await AddEpisode(episodeData);
      if (response.success) {
        console.log('Episode added successfully:', response.data);
        message.success("Successfully added the Episold");
        fetchEpisodes(projectId);

      } else {
        console.log('Failed to add episode:', response.message);
      }
    } catch (error) {
      console.log('An error occurred while adding the episode');
    }

    closeModal();

  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/register')

  };

  const handleEdit=(episodeId)=>{
    navigate(`/editflow/${projectName}/${navItem}/${episodeId}`);
  }

  const handleDelete=async (episodeId)=>{
    try {
      const response = await DeleteEpisode(episodeId);
      if (response.success) {
        message.success('Episode deleted successfully');
        fetchEpisodes(projectId)
       
      } else {
        console.log('Failed to delete episode:', response.message);
      }
    } catch (error) {
      console.log('An error occurred while deleting the episode');
    }
  }

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
        {navItem === 'Add your podcast' && (
          <div className='upload-middle'>
            <div className='title'>Add Podcast</div>
            <div className='media-box'>
              <div className='boxes' onClick={() => openModal({ image: youtube, name: 'Upload Youtube Video' })}>
                <img className='mediaimage' src={youtube} alt="media" />
                <p className='medianame'>Upload Youtube Video</p>
              </div>
              <div className='boxes' onClick={() => openModal({ image: media2, name: 'Upload Spotify Podcast' })}>
                <img className='mediaimage' src={media2} alt="media" />
                <p className='medianame'>Upload Spotify Podcast</p>
              </div>
              <div className='boxes' onClick={() => openModal({ image: media3, name: 'Upload from RSS Feed' })}>
                <img className='mediaimage' src={media3} alt="media" />
                <p className='medianame'>Upload from RSS Feed</p>
              </div>
            </div>
            {showEpisodesTable ? (
              <div className="episodes-table-container">
                <h2>Your Files</h2>
                <table className="episodes-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Episode Name</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {episodes.map((episode, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{episode.name}</td>
                        <td>{new Date(episode.createdAt).toLocaleString()}</td>
                        <td>
                          <button className="action-button edit-button" onClick={() => handleEdit(episode._id)}>View</button>
                          <button className="action-button delete-button" onClick={() => handleDelete(episode._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="filesupload-container">
                <img className="uploadimage" src={uploader} alt="upload" />
                <div className="text first">Drag & Drop or Select File</div>
                <div className="text second">Supported files: .mp4, .mov, .avi</div>
                <button className="selectbutton">Select File</button>
              </div>
            )}
          </div>
        )}
        {modalOpen && selectedMedia && (
          <div className='modal-backdrop' onClick={closeModal}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
              <button className='close-button' onClick={closeModal}>X</button>
              <div className='model-heading'>
                <img src={selectedMedia.image} alt="media" className='modal-image' />
                <h2>{selectedMedia.name}</h2>
              </div>
              <input type='text' placeholder='Name' className='modal-input' value={mediaName} onChange={(e) => setMediaName(e.target.value)} />
              <input type='text' placeholder='Link' className='modal-input' value={mediaLink} onChange={(e) => setMediaLink(e.target.value)} />
              <button className='upload-button' onClick={handleUpload}>Upload</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
