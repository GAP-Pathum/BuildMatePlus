import React, { useState, useEffect, useRef  } from 'react';
import './Home.css';
import CountUp from 'react-countup';
import homeimg from '../Components/Assets/wall1.jpg';
import ic1 from '../Components/Assets/ic1.png'; 
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';
import women from '../Components/Assets/Home-women.png';
import profile from '../Components/Assets/profile.png';
import seemore from '../Components/Assets/down-arrow.png'
import dreamimage from '../Components/Assets/1638943222107.jpeg'
import oppertunityimg from '../Components/Assets/construction-company-names.jpg'
import growthImage from '../Components/Assets/growth.png';
import groupImage from '../Components/Assets/group.png';
import propertyImage from '../Components/Assets/property.png';
import starImage from '../Components/Assets/star.png';
import viewImage from '../Components/Assets/3d-view(1).png';
import reviewImg01 from "../Components/Assets/review01.jpeg";
import reviewImg02 from "../Components/Assets/review02.jpeg";
import reviewImg03 from "../Components/Assets/review03.jpeg";
import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.css';
import { Navigation, Pagination } from 'swiper';


import ScrollTrigger from "react-scroll-trigger";
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={starImage}
          alt="star"
          className="star"
          style={{
            width: '15px',
            filter: i <= rating ? 'none' : 'grayscale(100%)',
          }}
        />
      );
    }
    return stars;
  };

const Home = () => {

  const [searchType, setSearchType] = useState('Expert');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement search functionality based on searchType and searchQuery
    console.log(`Searching ${searchType} for: ${searchQuery}`);
  };

  const [counterOn, setCounterOn] = useState(false);
  const pathWindow = () => {
    // Scroll to the target element
    const element = document.getElementById('firstbox');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (backInRightRef.current) {
      backInRightRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        backInRightRef.current.classList.add('animate__backInRightVisible');
      }, 300); // Adjust timing as needed
    }
    if (fadeInLeftRef.current) {
      fadeInLeftRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        fadeInLeftRef.current.classList.add('animate__fadeInLeftVisible');
      }, 300); // Adjust timing as needed
    }
  };
  const boxRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const boxElement = boxRef.current;
        if (boxElement) {
            observer.observe(boxElement);
        }

        return () => {
            if (boxElement) {
                observer.unobserve(boxElement);
            }
        };
    }, []);

    const fadeInRef = useRef(null);
    const backInRightRef = useRef(null);
    const fadeInLeftRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (entry.target.classList.contains('leFadeIn')) {
                entry.target.classList.add('leFadeInVisible');
              } else if (entry.target.classList.contains('animate__backInRight')) {
                entry.target.classList.add('animate__backInRightVisible');
              } else if (entry.target.classList.contains('animate__fadeInLeft')) {
                entry.target.classList.add('animate__fadeInLeftVisible');
              }
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1 // Trigger when 10% of the element is visible
        }
      );

      if (fadeInRef.current) {
        observer.observe(fadeInRef.current);
      }
      if (backInRightRef.current) {
        observer.observe(backInRightRef.current);
      }
      if (fadeInLeftRef.current) {
        observer.observe(fadeInLeftRef.current);
      }

      return () => {
        if (fadeInRef.current) {
          observer.unobserve(fadeInRef.current);
        }
        if (backInRightRef.current) {
          observer.unobserve(backInRightRef.current);
        }
        if (fadeInLeftRef.current) {
          observer.unobserve(fadeInLeftRef.current);
        }
      };
    }, []);
  
  return (
   <>
   
    <div className='homepage'>
      <Navbar/>
      <img className='wall' src={homeimg} alt='Background' />
      <div className='head-content'>
        <img src={ic1} alt='icon one' className='ic1' />
        
        
        <div className='content'>
          <div className='home-content-1'>
            <h1></h1>
            <div className='animate__fadeInUp' ref={fadeInRef}>
              <p>Buildmate+ connects countless dreamers with the perfect team to turn their construction visions into reality.</p>
            </div>
            
            
          </div>
          
          <div className='search-center'>
            <div className="search-bar-container">
              
                <div className="switch-buttons">
                  <button className={`switch-button-ex ${searchType === 'Expert' ? 'active' : ''}`} onClick={() => handleSearchTypeChange('Expert')}>Expert</button>
                  <button className={`switch-button-su ${searchType === 'Supplier' ? 'active' : ''}`} onClick={() => handleSearchTypeChange('Supplier')}>Supplier</button>
                  <button className={`switch-button-ma ${searchType === 'Material' ? 'active' : ''}`} onClick={() => handleSearchTypeChange('Material')}>Material</button>
                </div>
              <div className="search-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder={` Search ${searchType.toLowerCase()}`}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button className="search-button" onClick={handleSearchSubmit}>Search</button>
              </div>
            </div>
          </div>
          <div className='arrow'>
              <img
              className='downarrow' src={seemore} alt='downarrow'
              onClick={pathWindow}
              />
          </div>
          
        </div>
      </div>
    
      
        <div className='path'>
                      <div className='h1'>
                       <div className='firstbox'id='firstbox'>
                        <div className='animate_box1 animate__animated animate__fadeInLeft' ref={fadeInLeftRef}>
                          <div className='box1'>
                            <img src={dreamimage} className='dreamimg' alt='Dream' />
                            <div className='box'>
                                <h1 className='h1-text'>
                                    Ready to start building your dream or maintaining your existing construction?
                                </h1>
                                <Link to='/Pages/connect'>
                                    <button className='h1-button'>Build your dream</button>
                                </Link>
                            </div></div>

                        </div>
                        <div className='animate_box1 animate__animated animate__backInRight' ref={backInRightRef}>
                           <div className='box2'>
                            <img src={oppertunityimg} className='dreamimg01' style={{ transform: 'scaleX(-1)', zIndex:'-1',borderRadius:'0 65px 65px 0' }}/>
                            <div className='box'><h1 className='h2-text' style={{transform:'scaleX(-1)'}}>Ready to take on new projects or find exciting job opportunities in the construction industry? 
                            </h1>
                            <Link to="/Pages/Registration" >
                              <button className='h1-button'  style={{transform:'scaleX(-1)', }}>Explore Opportunities</button>
                            </Link>
                            </div>
                          </div> 
                        
                        </div>
                        <div className='animate_box1 animate__animated animate__fadeInLeft' ref={fadeInLeftRef}>
                          <div className='box3'>
                            <img src={dreamimage} className='dreamimg' alt='Dream' />
                            <div className='box'>
                                <h1 className='h1-text'>
                                Ready to join us and showcase your expertise to the world?
                                </h1>
                                <Link to='/Pages/Registration'>
                                    <button className='h1-button'>Be a BuildMate</button>
                                </Link>
                            </div></div>

                        </div>  
                          
                      </div> 
                      <div className='det'>
                          <div className='details-content'>
                           
                            <div className='t1'><ScrollTrigger onEnter={()=> setCounterOn(true)} onExit={()=>setCounterOn(false)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                              <h1 className='h-t1'>{counterOn &&  <CountUp start={0} end={1} duration={2} delay={0}/>}+</h1>
                              <p className='p-t1'>Years of experience </p></ScrollTrigger> 
                            </div>
                            <div className='t1'><ScrollTrigger onEnter={()=> setCounterOn(true)} onExit={()=>setCounterOn(false)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                              <h1 className='h-t1'>{counterOn &&  <CountUp start={0} end={200} duration={2} delay={0}/>}+</h1>
                              <p className='p-t1'>Number of professionals </p></ScrollTrigger> 
                            </div>
                            <div className='t1'><ScrollTrigger onEnter={()=> setCounterOn(true)} onExit={()=>setCounterOn(false)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                              <h1 className='h-t1'>{counterOn &&  <CountUp start={0} end={50} duration={2} delay={0}/>}+</h1>
                              <p className='p-t1'>Number of projects </p></ScrollTrigger> 
                            </div>
                            <div className='t1'><ScrollTrigger onEnter={()=> setCounterOn(true)} onExit={()=>setCounterOn(false)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                              <h1 className='h-t1'>{counterOn &&  <CountUp start={0} end={250} duration={2} delay={0}/>}+</h1>
                              <p className='p-t1'>Number of suppilers </p></ScrollTrigger> 
                            </div>
                          </div>
                    </div>
                          
                        
                      </div>
                      <div className='sub-head-content'>
                        <img src={women} alt='woman' className='woman-img'/>
                          <div className='wel-all-collection'>
                                <div className='wel-all' >
                                  
                                  <h1 className='wel-h'>Welcome to BuildMate+</h1>
                                  <p className='wel-p'>Choose BuildMate+ for your construction needs and unlock a world of possibilities. Join our thriving community of builders, designers, and dreamers, and let's build the future together.</p>
                                </div>
                                
                                <div className="wel1">
                                  <div className='we-c'>
                                    <img src={propertyImage} alt='property' className='wel-img'/>
                                  <h2 className="we-h">Dream Project Matchmaking</h2>
                                  <p className="we-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
                                  </div>
                                  <div className='we-c'>
                                    <img src={groupImage} alt='group'className='wel-img'/>
                                  <h2 className="we-h">Streamlined Communication</h2>
                                  <p className="we-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero</p>
                                  </div>
                                
                                    
                                  <div className='we-c'><img src={viewImage} alt='view'className='wel-img'/>
                                  <h2 className="we-h">Seamless 3D Design Integration</h2>
                                  <p className="we-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero</p>
                                  </div>

                                  <div className='we-c'>
                                    <img src={growthImage} alt='growth'className='wel-img'/>
                                  <h2 className="we-h">Transparent Progress Tracking</h2>
                                  <p className="we-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero</p>
                                  </div>
                              </div>
                          </div>
  
                      </div>
                      
                          

                          <div className='re-con'>
                            <h1 className='re-h'>We care about our customer<br/> experience too </h1>
                            <div className='review-con'>

                            <div className="con-1">
                              <img src={reviewImg01} alt="Profile" className="profile-img" style={{ width: '70px' }} />
                              <p className="re">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis donec et odio pellentesque diam volutpat commodo sed.
                              </p>
                              <div className="line-re"></div>
                              <div className="footer-con">
                                <div className="position">
                                  <p className="re-name">John Walker</p>
                                  <p className="re-po">Architecture</p>
                                </div>
                                <div className="reviewStar">{renderStars(4)}</div>
                              </div>
                            </div>
                            

                            <div className='con-1'>
                            <img src={reviewImg02} alt="Image" style={{width:'70px'}} className='profile-img'/>
                            <p className='re'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis donec et odio pellentesque diam volutpat commodo sed.</p>
                            <div className='line-re'></div>
                            <div className="footer-con">
                                <div className="position">
                                  <p className="re-name">John Walker</p>
                                  <p className="re-po">Architecture</p>
                                </div>
                                <div className="reviewStar">{renderStars(3)}</div>
                              </div>
                            </div>

                            <div className='con-1'>
                            <img src={reviewImg03} alt="Image" style={{width:'70px'}} className='profile-img'/>
                            <p className='re'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis donec et odio pellentesque diam volutpat commodo sed.</p>
                            <div className='line-re'></div>
                            <div className="footer-con">
                                <div className="position">
                                  <p className="re-name">John Walker</p>
                                  <p className="re-po">Architecture</p>
                                </div>
                                <div className="reviewStar">{renderStars(5)}</div>
                              </div>
                            </div>

                          </div>
                          </div>    
                          <Footer/>     

                  
                                
                      
      </div>
    </div>
   </>
  );
}

export default Home;
