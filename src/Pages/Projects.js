import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Projects.css';
import mimg1 from "../Components/Assets/login1.jpg";
import pp1 from "../Components/Assets/pro-p1.jpg";
import pp2 from "../Components/Assets/pro-p2.jpg";

import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';
import pp3 from "../Components/Assets/pro-p3.jpg";
import ppmu6 from "../Components/Assets/pro-mu6.jpg";
import pp5 from "../Components/Assets/pro-p5.jpg";
import ppmu4 from "../Components/Assets/pro-mu4.jpg";
import ppmu1 from "../Components/Assets/pro-mu1.jpg";

import pp8 from "../Components/Assets/pro-p8.jpg";
import pp9 from "../Components/Assets/pro-p9.jpg";
import pprs1 from "../Components/Assets/pro-rs1.jpeg";
import pprs2 from "../Components/Assets/pro-rs2.jpeg";
import pprs3 from "../Components/Assets/pro-rs3.jpeg";
import pprs4 from "../Components/Assets/pro-rs4.jpeg";
import pprs5 from "../Components/Assets/pro-rs5.jpeg";
import pprs6 from "../Components/Assets/pro-rs6.jpeg";
import ppmu2 from "../Components/Assets/pro-mu2.jpeg";
import ppmu3 from "../Components/Assets/pro-mu3.jpeg";
import ppmu5 from "../Components/Assets/pro-mu5.jpeg";
import ppof1 from "../Components/Assets/pro-of1.jpeg";
import ppof2 from "../Components/Assets/pro-of2.jpeg";
import ppof3 from "../Components/Assets/pro-of3.jpeg";
import ppof4 from "../Components/Assets/pro-of4.jpeg";
import ppof5 from "../Components/Assets/pro-of5.jpeg";
import ppof6 from "../Components/Assets/pro-of6.jpeg";
import ppwh1 from "../Components/Assets/pro-wh1.jpeg";
import ppwh2 from "../Components/Assets/pro-wh2.jpeg";
import ppwh3 from "../Components/Assets/pro-wh3.jpeg";
import ppwh4 from "../Components/Assets/pro-wh4.jpeg";
import ppwh5 from "../Components/Assets/pro-wh5.jpeg";
import ppwh6 from "../Components/Assets/pro-wh6.jpeg";




const Projects = () => {
     const [projects, setProjects] = useState([]); // All projects
     const [filteredProjects, setFilteredProjects] = useState([]); // Filtered projects
     const [searchQuery, setSearchQuery] = useState(''); // Search text
     const [activeCategory, setActiveCategory] = useState('All'); // Filter by project type
     
     const navigate = useNavigate();

     const categories = [
       'All',
       'Single Family Homes',
       'Multi-Unit Dwellings',
       'Retail Spaces',
       'Office Spaces',
       'Warehouses',
     ];
   
     const mockProjects = [
    // Single Family Homes
    { id: 1, name: "Modern Farmhouse Dream", type: "Single Family Homes", progress: "70%", cost: "2.5Cr", image: pp1, date: "March 07, 2024" },
    { id: 2, name: "Serenity Springs Residence", type: "Single Family Homes", progress: "73%", cost: "1.0Cr", image: pp2, date: "April 18, 2024" },
    { id: 3, name: "Sunset Ridge Chalet", type: "Single Family Homes", progress: "67%", cost: "2.1Cr", image: pp3, date: "June 22, 2024" },
    { id: 4, name: "Bluebird Meadow Homestead", type: "Single Family Homes", progress: "87%", cost: "1.5Cr", image: pp5, date: "March 01, 2024" },
    { id: 5, name: "Harmony Hill House", type: "Single Family Homes", progress: "75%", cost: "1.8Cr", image: pp8, date: "March 12, 2024" },
    { id: 6, name: "Willowbrook Cottage", type: "Single Family Homes", progress: "85%", cost: "2.0Cr", image: pp9, date: "March 20, 2024" },

    // Multi-Unit Dwellings
    { id: 7, name: "Collective Haven Residences", type: "Multi-Unit Dwellings", progress: "82%", cost: "1.8Cr", image: ppmu1, date: "March 10, 2024" },
    { id: 8, name: "Community Comfort Homes", type: "Multi-Unit Dwellings", progress: "75%", cost: "2.0Cr", image: ppmu2, date: "March 27, 2024" },
    { id: 9, name: "Village Green Residences", type: "Multi-Unit Dwellings", progress: "80%", cost: "1.5Cr", image: ppmu3, date: "March 01, 2024" },
    { id: 10, name: "Family Retreat Apartments", type: "Multi-Unit Dwellings", progress: "90%", cost: "2.3Cr", image: ppmu4, date: "March 15, 2024" },
    { id: 11, name: "Serene Sanctuaries", type: "Multi-Unit Dwellings", progress: "88%", cost: "2.6Cr", image: ppmu5, date: "April 05, 2024" },
    { id: 12, name: "Tranquil Tower Residences", type: "Multi-Unit Dwellings", progress: "76%", cost: "1.9Cr", image: ppmu6, date: "April 10, 2024" },

    // Retail Spaces
    { id: 13, name: "Retail Hub Downtown", type: "Retail Spaces", progress: "85%", cost: "1.7Cr", image: pprs1, date: "March 09, 2024" },
    { id: 14, name: "Vintage Vogue Emporium", type: "Retail Spaces", progress: "78%", cost: "2.2Cr", image: pprs2, date: "March 12, 2024" },
    { id: 15, name: "Urban Chic Haven", type: "Retail Spaces", progress: "80%", cost: "2.0Cr", image: pprs3, date: "March 14, 2024" },
    { id: 16, name: "Coastal Charm Market", type: "Retail Spaces", progress: "82%", cost: "2.1Cr", image: pprs4, date: "April 02, 2024" },
    { id: 17, name: "Rustic Retreat Boutique", type: "Retail Spaces", progress: "79%", cost: "1.9Cr", image: pprs5, date: "April 07, 2024" },
    { id: 18, name: "Modern Luxe Mall", type: "Retail Spaces", progress: "81%", cost: "2.3Cr", image: pprs6, date: "April 12, 2024" },

    // Warehouses
    { id: 19, name: "Industrial Bliss Depot", type: "Warehouses", progress: "88%", cost: "2.0Cr", image: ppwh1, date: "April 07, 2024" },
    { id: 20, name: "Vintage Vault Haven", type: "Warehouses", progress: "79%", cost: "2.5Cr", image: ppwh2, date: "April 10, 2024" },
    { id: 21, name: "Prestige Place Depot", type: "Warehouses", progress: "81%", cost: "2.6Cr", image: ppwh3, date: "April 15, 2024" },
    { id: 22, name: "Rustic Charm Warehouse", type: "Warehouses", progress: "84%", cost: "2.1Cr", image: ppwh4, date: "April 18, 2024" },
    { id: 23, name: "Timeless Treasure Depot", type: "Warehouses", progress: "86%", cost: "2.3Cr", image: ppwh5, date: "April 22, 2024" },
    { id: 24, name: "Contemporary Storage Hub", type: "Warehouses", progress: "90%", cost: "2.8Cr", image: ppwh6, date: "April 25, 2024" },
     ];
   
     useEffect(() => {
       setProjects(mockProjects);
       setFilteredProjects(mockProjects);
     }, []);
   
     const handleSearchChange = (e) => {
       setSearchQuery(e.target.value);
       filterProjects(activeCategory, e.target.value);
     };
   
     const handleCategoryChange = (category) => {
       setActiveCategory(category);
       filterProjects(category, searchQuery);
     };
   
     const filterProjects = (category, query) => {
       const lowerCaseQuery = query.toLowerCase();
       const filtered = projects.filter((project) => {
         const matchesCategory = category === 'All' || project.type === category;
         const matchesQuery = project.name.toLowerCase().includes(lowerCaseQuery);
         return matchesCategory && matchesQuery;
       });
       setFilteredProjects(filtered);
     };
   
     return (
<div style={{position: 'relative'}}>
      <Navbar/>
      <img className='pro-mimg' src={mimg1} alt='Background'/>
      <div className='pro-content'>
        <h1 className='pro-topic'>Projects</h1>
        <p className='pro-subtopic'>We build, We craft :<br/>Building Dreams Through Construction</p>
      </div>
      <div className='pro-body01'>
        <div className='pro-st1'>Ongoing Projects</div>
        <div className='pro-tline'>
          <div className='pro-line'></div>
          {activeCategory}
          <div className='pro-line'></div>
        </div>
      </div>
      <div className='pro-body02'>
        <div className='pro-Subbody01'>
          <div className='pro-fil'>Filters</div>
          <div className='pro-sea'>search</div>   
        </div>
        </div>
        <div className='pro-body03'>
        <div className='pro-Subbody02'>
            <div className='pro-st2'>Project Types</div>
          </div>
          </div>
         <div className='filter-container'>
           {categories.map((category) => (
             <button
               key={category}
               onClick={() => handleCategoryChange(category)}
               className={`filter-button ${activeCategory === category ? 'active' : ''}`}
             >
               {category}
             </button>
           ))}
         </div>
         <div className="project-cards-container">
           {filteredProjects.length > 0 ? (
             filteredProjects.map((project) => (
               <div key={project.id} className="project-card">
                 <img src={project.image} alt={project.name} className="project-image" />
                 <div className="project-details">
                   <p className="pro-date"><b>{project.date}</b></p>
                   <h3 className="pro-head">{project.name}</h3>
                   <p><b>Progress:</b> {project.progress}</p>
                   <p><b>Cost:</b> {project.cost}</p>
                   <p><b>Type:</b> {project.type}</p>
                   <button className="more-details-btn">More Details</button>
                 </div>
               </div>
             ))
           ) : (
             <p className="no-projects-message">No projects found.</p>
           )}
         </div>
         <Footer />
       </div>
       
     );
   };
   
   export default Projects;