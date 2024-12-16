//src/Components/Subscribe/Sub.js
import React, { useState } from 'react';
import './Sub.css';
import axios from 'axios';

const SubscribePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [userType, setUserType] = useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleSubscribe = async () => {
        try {
            await axios.post('/api/subscribe', { email, firstName, userType });
            alert('Subscription successful!');
            togglePopup();
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('Subscription failed. Please try again.');
        }
    };

    return (
        <div className="subscribe-container">
            <button onClick={togglePopup} className="subscribe-button">
                Subscribe
            </button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Subscribe to BuildMate+</h2>
                        <p>Get the latest updates and offers!</p>
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
                            Subscribe
                        </button>
                        <button className="close-button" onClick={togglePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscribePopup;