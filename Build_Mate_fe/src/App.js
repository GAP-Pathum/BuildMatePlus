import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Profiler } from 'react';

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Project from "./Pages/Projects"; 
import BlogPage from "./Pages/BlogPage";
import Contact from "./Pages/Contact";
import Connect from "./Pages/Connect";
import Registration from "./Pages/Registration";
import Professional from "./Pages/Professional";
import MaterialSup from "./Pages/MaterialSup";
import ServiceSup from "./Pages/ServiceSup";
import Architecture from "./Pages/Architecture";
import Profile from "./Pages/Profile"
import Suppliers from "./Pages/Supplier";
import Chat from "./Pages/Chat"; 
import ChatIcon from "./Pages/ChatIcon";
import ProfProfile from "./Pages/ProfProfile";
import MaterialProfile from "./Pages/MaterialProfile"
import EditProfile from './Pages/EditProfile';
import ArchProfile from "./Pages/ArchProfile";
import ChatApp from "./Components/ChatApp/App";
import PrivacyPolicy from ".//Pages/PrivacyPolicy";
import ImageGenerator from "./Pages/ImageGenerator";
import SupConnect from "./Pages/SupConnect";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pages/Login" element={<Login />} />
          <Route path="/Pages/Signup" element={<Signup />} />
          <Route path="/Pages/About" element={<About />} />
          <Route path="/Pages/Projects" element={<Project />} />
          <Route path="/Pages/BlogPage" element={<BlogPage />} />
          <Route path="/Pages/Contact" element={<Contact />} />
          <Route path="/Pages/Connect" element={<Connect />} />
          <Route path="/Pages/Registration" element={<Registration/>}/>
          <Route path="/Pages/Professional" element={<Professional />}/>
          <Route path="/Pages/MaterialSup" element={<MaterialSup />}/>
          <Route path="/Pages/ServiceSup" element={<ServiceSup />}/>
          <Route path="/Pages/Architecture" element={<Architecture />}/>
          <Route path="/Pages/Profile" element={<Profile />}/>
          <Route path="/Pages/Supplier" element={<Suppliers/>}/>
          <Route path="/Pages/Chat" element={<Chat />} />
          <Route path="/Pages/ArchProfile" element={<ArchProfile />} />
          <Route path="/Pages/ProfProfile" element={<ProfProfile/>}/>
          <Route path="./Pages/MaterialProfile" element={<MaterialProfile/>}/>
          <Route path="/Components/ChatApp/App" element={<ChatApp/>}/>
          <Route path="/Pages/PrivacyPolicy" element={<PrivacyPolicy/>}/>
          <Route path="/Pages/ImageGenerator" element={<ImageGenerator/>}/>
          <Route path="/Pages/SupConnect" element={<SupConnect/>}/>
          {/* <Route path="/Pages/EditProfile" element={<EditProfile/>} /> */}
        </Routes>
        <ChatIcon />
      </Router>
    </div>
  );
}

export default App;
