import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const location = useLocation();
  const [profile, setProfile] = useState(location.state?.profile || {});

  useEffect(() => {
    if (!location.state?.profile) {
      // Fetch the profile data from the backend if not passed via location state
      axios.get('/api/profProfile')
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the profile!', error);
        });
    }
  }, [location.state?.profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated profile data to the backend
    axios.post('/api/profProfile', profile)
      .then(response => {
        console.log('Profile updated successfully!', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={profile.name} onChange={handleChange} />
      </label>
      <label>
        Profession:
        <input type="text" name="profession" value={profile.profession} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={profile.email} onChange={handleChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={profile.location} onChange={handleChange} />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
      </label>
      <label>
        LinkedIn:
        <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} />
      </label>
      <label>
        Website:
        <input type="text" name="website" value={profile.website} onChange={handleChange} />
      </label>
      <label>
        About:
        <textarea name="about" value={profile.about} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfile;
