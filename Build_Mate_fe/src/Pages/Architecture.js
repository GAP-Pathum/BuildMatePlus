import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Architecture.css';
import { useHistory } from 'react-router-dom';
import Primg from "../Components/Assets/Pim1.jpg";
import prof from "../Components/Assets/prof-pic.jpg";

import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';

const Architecture = () => {
  const [professionTitle, setProfessionTitle] = useState('Architecture');
  const [activeButton, setActiveButton] = useState('Architecture');
  const navigate = useNavigate();

  const handleProfessionChange = (newTitle) => {
    setProfessionTitle(newTitle);
    setActiveButton(newTitle);
  };

  const handleMoreDetailsClick = (profileData) => {
    navigate('../Pages/ArchProfile', { state: profileData });
};

const profileData = {
    name: "Vishwa Wijesekare",
    profession: professionTitle,
    profileImage: prof,
    ratings: 5.4
};


  return (
    <div>
      <Navbar />
      <div className='home_sup' style={{marginTop:'0%',marginLeft:'3%'}}>
        <img className='sup-mimg' src={Primg} alt='Background' />
        <div className='Sup-content'>
          <h1 className='sup-topic'>Find the Professional For Your Maintenance Needs;</h1>
          <p className='Sup-subtopic1'>Streamline your projects, empower your teams, and accelerate decision-making with our construction project management software.</p>
          <button className="sbutton1">GET STARTED</button>
          
        </div>
      </div>
      <div className='pro-content01'>
      <p className='pro-subtopic' style={{color:'white'}}>We build, We craft :<br /><span className="larger">Building Dreams Through Construction</span></p>
      </div>

      <div className='pro-body01'>
        <div className='pro-st1'>Professions</div>
        <div className='pro-line'></div>
        <div className='pro-tline' style={{fontWeight:'600'}}>{professionTitle}</div>
        <div className='pro-line'></div>
      </div>
      <div className='archi-body02' style={{flexWrap:'wrap'}}>
        <div className='pro-Subbody01'>
          <div className='pro-fil'>Filters</div>
          <div className='pro-sea'>search</div>   
        </div>
        <div className='arch-body03' style={{justifyContent: 'space-around'}}>
        <div className='pro-Subbody02' style={{marginTop:'2%',width:'15%',border:'2px solid black',borderRadius:'25px',padding:'3%',height:'50%'}}>
          <button
            className={activeButton === 'Architecture' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Architecture')}
          >
            Architecture
          </button><br />
          <button
            className={activeButton === 'Engineers' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Engineers')}
          >
            Engineers
          </button><br />
          <button
            className={activeButton === 'Project Managers' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Project Managers')}
          >
            Project Managers
          </button><br />
          <button
            className={activeButton === 'Legal Advisors' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Legal Advisors')}
          >
            Legal Advisors
          </button><br />
          <button
            className={activeButton === 'Interior Designers' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Interior Designers')}
          >
            Interior Designers
          </button><br />
          <button
            className={activeButton === 'Landscapers' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Landscapers')}
          >
            Landscapers
          </button><br />
          <button
            className={activeButton === 'Plumbers' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Plumbers')}
          >
            Plumbers
          </button><br />
          <button
            className={activeButton === 'Electricians' ? "pro-con1-t1 active" : "pro-con1-t1"}
            onClick={() => handleProfessionChange('Electricians')}
          >
            Electricians
          </button>
      </div>
      

      <div className="archi-event01" >
        <table className='archi-tab'>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <td className='profile1' key={colIndex}>
                  <div className='pro-scon1' style={{width:'100%',display:'flex', flexDirection: 'column',alignItems: 'center'}}>
                    <img className='pp' src={prof} alt='Background' />
                  <div className='pro-box' style={{lineHeight:'10px'}}>
                  <h2 className="profile-name">Vishwa Wijesekare</h2>
                  <p className="profile-title">{professionTitle}</p>
                  <p className="profile-exp">Years of experience  :<span className="larger2"> 5yr</span></p>
                  <button className="button3" onClick={() => handleMoreDetailsClick(profileData)}>More Details</button></div></div>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      </div>
      </div>
      <Footer />
    
    </div>
  );
};

export default Architecture;
