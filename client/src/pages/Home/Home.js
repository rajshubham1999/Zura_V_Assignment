
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import homepageimage from '../../assets/homepageimage.png';
import vector from '../../assets/Vector.png';
import './Home.css';
import { AddProject } from '../../apicalls/projects';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Home() {
    const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateProjectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
    setProjectName('');
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
    setErrorMessage('');
  };

  const handleCreateButtonClick = async() => {
    if (projectName.trim() === '') {
      setErrorMessage('Please enter a project name.');
    } else {
        try {
            const payload = { name: projectName };
            const response = await AddProject(payload);
            if (response.success) {
              message.success(`Project created successfully: ${projectName}`);
              handleCloseModal();
              navigate('/projects')
            } else {
              setErrorMessage(response.message || 'Failed to create project');
            }
          } catch (error) {
            setErrorMessage('An error occurred while creating the project');
          }
    }
  };

  return (
    <div className='main'>
      <Navbar />
      <div className='homecontainer'>
        <div className='heading'>
          <p>Create a New Project</p>
        </div>
        <div className='homepageimage'>
          <img src={homepageimage} alt="image" />
        </div>
        <p className='paragraph'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in
        </p>
        <div className='create' onClick={handleCreateProjectClick}>
          <img src={vector} />
          <button className='create-project'>Create Project</button>
        </div>
      </div>

      {isModalOpen && (
        <div className='modales'>
          <div className='modales-content'>
            <h2>Create Project</h2>
            <p>Enter Project Name:</p>
            <input
              type="text"
              value={projectName}
              autoFocus
              onChange={handleProjectNameChange}
              placeholder="Project name"
            />
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <div className='modales-buttons'>
              <button className='cancel-button' onClick={handleCloseModal}>Cancel</button>
              <button className='create-button' onClick={handleCreateButtonClick}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
