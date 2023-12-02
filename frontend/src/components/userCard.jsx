import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch(`https://usermanagement-g8b8.onrender.com/api/users/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.statusText}`);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setError('Failed to fetch user details. Please try again later.');
      }
    };

    getUserDetails();
  }, [params.id]);

  return (
    <div className="user-details">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div className="user-card">
          <img src={user.avatar} alt="User Avatar" />
          <p>Name: {user.first_name} {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Domain: {user.domain}</p>
          <p>Available: {user.available ? 'Yes' : 'No'}</p>
          
        </div>
      )}
    </div>
  );
};

export default UserDetails;
