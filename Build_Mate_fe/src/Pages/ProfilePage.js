import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem('userEmail');

            if (!userEmail) {
                setError("You are not logged in. Please log in to view your profile.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/profile/${userEmail}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Could not fetch user data. Please try again.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        Swal.fire('Success', 'You have been logged out.', 'success').then(() => {
            window.location.href = '/login'; // Redirect to login page
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Welcome, {user.firstName}!</h2>
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
                {user.profilePicture ? (
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                ) : (
                    <div
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            backgroundColor: '#ddd',
                            lineHeight: '150px',
                            margin: '0 auto',
                        }}
                    >
                        No Image
                    </div>
                )}
            </div>
            <div>
                <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Country:</strong> {user.country}</p>
                <p><strong>Date of Birth:</strong> {`${user.birthdayDate}/${user.birthdayMonth}/${user.birthdayYear}`}</p>
                <p><strong>User Type:</strong> {user.userType.join(", ")}</p>
                <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
