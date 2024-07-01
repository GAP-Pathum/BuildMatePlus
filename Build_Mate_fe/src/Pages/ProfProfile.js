import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';
import linkedin from '../Components/Assets/linkedin.png';
import gps from '../Components/Assets/gps.png';
import Phone from '../Components/Assets/phone-call(1).png';
import Email from '../Components/Assets/email(1).png';
import web from '../Components/Assets/web.png';
import uploadIcon from '../Components/Assets/upload.png';
import './ProfProfile.css';
import axios from 'axios';
import star from '../Components/Assets/star.png';
import Portfolio from '../Components/Assets/Archi-Porfolio.jpg';
import { useNavigate } from 'react-router-dom';
import currentPro from '../Components/Assets/current-pro.jpg';

const Review = ({ name, date, text }) => (
  <div className="review">
    <div className="review-header">
      <span className="review-name">{name}</span>
      <span className="review-date">{date}</span>
    </div>
    <p className="review-text">{text}</p>
    <div className="review-footer">
      {[...Array(5)].map((_, index) => (
        <img key={index} src={star} alt="star" className="review-star" />
      ))}
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    profession: '',
    email: '',
    location: '',
    phone: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    website: '',
    about: '',
    profilePicture: '',
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the profile data from the backend
    axios.get('/api/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error);
      });

    // Fetch the reviews data from the backend (if applicable)
    axios.get('/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the reviews!', error);
      });
  }, []);

  const defaultText = {
    name: 'Your Name',
    profession: 'Your Profession',
    email: 'Your Email',
    location: 'Your Location',
    phone: 'Your Phone Number',
    linkedin: 'Your LinkedIn',
    website: 'Your Website',
    about: 'Short bio about yourself',
  };

  return (
    <div>
      <div className='Archi-nav' style={{ backgroundColor: '#FF6B00' }}>
        <Navbar />
      </div>
      <h1 className='mainTopic'>Profile</h1>
      <div className="profile-container">
        <div className="profile-container01">
          <div className="prof-image" onClick={() => document.getElementById('profilePictureInput').click()}>
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" />
            ) : (
              <div className='prof-imageUpload'>
                <img src={uploadIcon} alt="Upload" />
                <p>Upload your image</p>
              </div>
            )}
          </div>

          <div className='pro-mainTopic'>
            <div className='pro-name'>{profile.name || <span className="default-text">{defaultText.name}</span>}</div>
            <div className='pro-profession'>{profile.profession || <span className="default-text">{defaultText.profession}</span>}</div>
          </div>
          <div className='pro-links'>
            <img src={Email} alt='email' className='pro-Icon' />
            <p>{profile.email || <span className="default-text">{defaultText.email}</span>}</p>
          </div>
          <div className='pro-links'>
            <img src={linkedin} alt='linkedin' className='pro-Icon' />
            <p>{profile.linkedin || <span className="default-text">{defaultText.linkedin}</span>}</p>
          </div>
          <div className='pro-links'>
            <img src={Phone} alt='phone' className='pro-Icon' />
            <p>{profile.phone || <span className="default-text">{defaultText.phone}</span>}</p>
          </div>
          <div className='pro-links'>
            <img src={gps} alt='location' className='pro-Icon' />
            <p>{profile.location || <span className="default-text">{defaultText.location}</span>}</p>
          </div>
          <div className='pro-links'>
            <img src={web} alt='website' className='pro-Icon' />
            <p>{profile.website || <span className="default-text">{defaultText.website}</span>}</p>
          </div>
          <div className='pro-bio'>
            <p>{profile.about || <span className="default-text">{defaultText.about}</span>}</p>
          </div>
          <div className='pro-buttonVersion'>
            <button className="message-button" onClick={() => navigate('/Pages/EditProfile', { state: { profile } })}>Edit Profile</button>
            <button className="message-button" onClick={() => window.location.href = '/Pages/ArchProfile'}>Public Profile</button>
          </div>
        </div>
        <div className="profile-container02">
          <div className='profileBox01'>
            <div className='profMiniBox'>
              <h2>1</h2>
              <p>level</p>
            </div>
            <div className='profMiniBox'>
              <h2>2</h2>
              <p>Job Ongoing</p>
            </div>
            <div className='profMiniBox'>
              <h2>25</h2>
              <p>Job Done</p>
            </div>
          </div>
          <div className='profileBox01'>
            <div className='profMiniBox3'>
              <p>Total Earning</p>
              <h2>7500.00$</h2>
            </div>
          </div>
          <div className='profileBox02'>
            <h2>Ongoing Project</h2>
            <div className='profMiniBox1'>
              <div className='profMiniBox'>
                <h4>Customer<br /> <span>Michel Stark</span></h4>
                <p>Gampaha, Sri Lanka</p>
                <div className='profMiniBox2'>
                  <p>Time<br />Remaining</p>
                  <h3><span>:21</span>hr</h3>
                </div>
              </div>
              <div className='profMiniBox'>
                <h4>Customer<br /><span>Michel Stark</span></h4>
                <p>Gampaha, Sri Lanka</p>
                <div className='profMiniBox2'>
                  <p>Time<br />Remaining</p>
                  <h3><span>:21</span>hr</h3>
                </div>
              </div>
            </div>
          </div>
          <div className='profileBox02'>
            <h2>Portfolios</h2>
            <div className='profMiniBox4'>
              <img src={Portfolio} alt='portfolio' />
              <img src={Portfolio} alt='portfolio' />
              <img src={Portfolio} alt='portfolio' />
            </div>
            <h2>Current Projects</h2>
            <div className='profMiniBox4'>
              <img src={currentPro} alt='portfolio' />
              <img src={currentPro} alt='portfolio' />
              <img src={currentPro} alt='portfolio' />
            </div>
            <h2>Current Projects</h2>
            <div className='profMiniBox4'>
              <img src={currentPro} alt='portfolio' />
              <img src={currentPro} alt='portfolio' />
              <img src={currentPro} alt='portfolio' />
            </div>
          </div>
          <div className='profileBox02'>
            <h2>Feedbacks</h2>
            <div className="reviews-container">
              {reviews.map((review, index) => (
                <Review key={index} name={review.name} date={review.date} text={review.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
