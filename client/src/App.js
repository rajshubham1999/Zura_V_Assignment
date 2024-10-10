
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Protectedroute from './components/Protectedroute';
import Register from './pages/register/Register';
import Navbar from './components/Navbar/Navbar';
import Projects from './pages/Projects/Projects';
import Sidebar from './components/sidebar/Sidebar';
import Upload from './pages/Upload/Upload';
import Edit from './pages/Edit/Edit';
import AccountInfo from './pages/AccountInfo/AccountInfo';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Protectedroute element={<Home />} />} />
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/projects' element={<Protectedroute element={<Projects />} />}/>
        <Route path="/upload/:projectName/:navItem" element={<Upload />} />
        <Route path='/editflow/:projectName/:navItem/:episodeId' element={<Edit />}/>
        <Route path='/AccountInfo' element={<Protectedroute element={<AccountInfo />} />}/>
        
      </Routes>
      </BrowserRouter>
      
      

     
      
      
      

     
    </div>
  );
}

export default App;
