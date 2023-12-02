// TeamDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamDetails = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userID = sessionStorage.getItem("userID");

        // Assuming you have a route to fetch team members from the backend
        const response = await axios.get(`https://usermanagement-g8b8.onrender.com/api/team/${userID}`,{
            headers: {
                Authorization: token ? `${token}` : "",
              }
        });
        setTeamMembers(response.data);
      } catch (error) {
        setError("Error fetching team members");
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="team-details-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {teamMembers.map((member) => (
        <div key={member._id} className="member-card">
        

          <img src={member.memberId.avatar} alt="User Avatar" />
          <p>Name: {member.memberId.first_name} {member.memberId.last_name}</p>
          <p>Email: {member.memberId.email}</p>
          <p>Gender: {member.memberId.gender}</p>
          <p>Domain: {member.memberId.domain}</p>
          <p>Available: {member.memberId.available ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamDetails;
