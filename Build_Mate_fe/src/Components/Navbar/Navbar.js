import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/Logo_version2.0.png';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const storedFirstName = localStorage.getItem('firstName');

    if (userEmail && storedFirstName) {
      setIsAuthenticated(true);
      setFirstName(storedFirstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('firstName');
    setIsAuthenticated(false);
    setFirstName('');
    window.location.reload();
  };


  return (
    <section className='home1'>
      <div className='navbar'>
        <div className='nav-logo'>
          <img src={logo} alt='Logo' />
        </div>


        <ul className='nav-menu'>
          <li>
            <Link to="/Pages/home">
              <button className={`nav-button ${location.pathname === '/Pages/home' ? 'active' : ''}`}>
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Pages/about">
              <button className={`nav-button ${location.pathname === '/Pages/about' ? 'active' : ''}`}>
                About
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Pages/projects">
              <button className={`nav-button ${location.pathname === '/Pages/projects' ? 'active' : ''}`}>
                Projects
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Pages/BlogPage">
              <button className={`nav-button ${location.pathname === '/Pages/BlogPage' ? 'active' : ''}`}>
                Blogs
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Pages/contact">
              <button className={`nav-button ${location.pathname === '/Pages/contact' ? 'active' : ''}`}>
                Contact
              </button>
            </Link>
          </li>

          {isAuthenticated ? (
            <div className='navbtn'>
              <li><span>Hi, {firstName } </span>
                <button className='signbtn' style={{ border: 'none' }} onClick={handleLogout}> Logout</button>
              </li>
            </div>
          ) : (
            <>
              <div className='navbtn'>
                <li><Link to="/Pages/login">
                  <button className='signbtn' style={{ border: 'none' }}>Sign in</button>
                </Link></li>
              </div>
              <div className='navbtn'>
                <li><Link to="/Pages/signup">
                  <button className='joinbtn'>Join</button>
                </Link></li>
              </div>
            </>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Navbar;
