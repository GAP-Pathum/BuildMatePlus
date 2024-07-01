import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Connect.css';

import c1 from '../Components/Assets/Architecture-1.jpg';
import Navbar from '../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function Connect() {
  const navigate = useNavigate();

  const handleFindProfessionalsClick = () => {
    navigate('/pages/Architecture');
  };
  const handleFindSuppliersClick = () => {
    navigate('/pages/Supplier');
  };

  return (
    <div>
      <Navbar />
      <div className="contact-image-container">
        <img className='connect-img'src={c1} alt="Background" />
        <div className="contact-white-container">
          <div className='contact-head'>BUILD YOUR DREAM</div>
          <p className='para'>
            From concept to completion, Buildmate+ helps you bring your construction dreams to life. Whether you're starting a new project or maintaining an existing one, our platform empowers you to create, collaborate, and construct with confidence.
          </p>
          <div className='orange-container'>
            <div className="orange-container1">
              <div className='para1'>Find professionals For your dream.</div>
              <div className="connect-02">
                <button className="con-button" onClick={() => window.location.href = '/Pages/Architecture'}>
                Find Professionals
              </button>
              </div>
              <div className='sen1'>More Details</div>
            </div>
            <div className="orange-container1">
              <div className='para1'>Find the Suppliers for Your Maintenance Needs</div>
              <div className="connect-02">
                <button className="con-button" onClick={() => window.location.href = '/Pages/Supplier'}>
                Find Suppliers
              </button>
              </div>
              <div className='sen1'>More Details</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
