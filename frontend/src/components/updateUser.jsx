import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateUserForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [domain, setDomain] = useState("");
  const [available, setAvailable] = useState(false); 
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        let result = await fetch(`https://usermanagement-g8b8.onrender.com/api/users/${params.id}`);
        result = await result.json();
        setFirstName(result.first_name);
        setLastName(result.last_name);
        setEmail(result.email);
        setGender(result.gender);
        setAvatar(result.avatar);
        setDomain(result.domain);
        setAvailable(result.available);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, [params.id]);

  const updateUser = async () => {
    try {
      let result = await fetch(`https://usermanagement-g8b8.onrender.com/api/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          gender,
          avatar,
          domain,
          available,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      Swal.fire({
        text: result.msg,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);

      Swal.fire({
        text: "Something went wrong",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="user">
      <h1>Update User</h1>
      <input
        type="text"
        placeholder="Enter first name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter last name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="Enter gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      /> */}
      <input
        type="text"
        placeholder="Enter avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <div>
        <label>Select Domain:</label>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="">Select Domain</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Business Development">Business Development</option>
        </select>
      </div>
      <div>
        <label>Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <label>
        Available:
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
      </label>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
};

export default UpdateUserForm;
