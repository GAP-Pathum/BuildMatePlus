import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sub.css';

const Subscription = () => {
    const [isOpen, setIsOpen] = useState(false); // Main popup state
    const [showForm, setShowForm] = useState(false); // Subscription form state

    // Form input states
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [userType, setUserType] = useState('');

    // Automatically open popup 
    useEffect(() => {
        const interval = setInterval(() => {
            setIsOpen(true);
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    // Handle Subscription Form Submission
    const handleSubscribe = async () => {
        try {
            await axios.post('/api/subscribe', { email, firstName, userType });
            alert('Subscription successful!');
            setShowForm(false); // Close form
            setIsOpen(false);   // Close popup
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('Subscription failed. Please try again.');
        }
    };

    return (
        <div>
            {/* Main popup */}
            {isOpen && !showForm && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <div className="popup-icon">
                            <div className="star">★</div>
                        </div>
                        <h2 className="popup-title">Recurring is premium Feature.</h2>
                        <p className="popup-subtitle">
                            Upgrade just for <strong>$25</strong> a month.
                        </p>
                        <button
                            className="popup-upgrade-button"
                            onClick={() => setShowForm(true)} // Show the form
                        >
                            Upgrade
                        </button>
                        <p className="popup-footer-text">See all premium features</p>
                        <button className="popup-close" onClick={() => setIsOpen(false)}>
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Subscription form */}
            {showForm && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <button className="close-button" onClick={() => setShowForm(false)}>
                            &times;
                        </button>
                        <h2>✨ Join BuildMate+ Community! ✨</h2>
                        <p>Stay updated with our latest updates and offers 🚀</p>
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            className="name-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter your user type"
                            className="user-type-input"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        <button className="submit-button" onClick={handleSubscribe}>
                            Subscribe Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscription;
