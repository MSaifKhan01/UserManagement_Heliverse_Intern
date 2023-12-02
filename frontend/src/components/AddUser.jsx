import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    avatar: '',
    domain: '',
    available: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use the type to determine the input type and handle the change accordingly
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://usermanagement-g8b8.onrender.com/api/users', formData);

      console.log(response.msg)
      console.log('User added:', response.data);

      // Reset the form data
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        avatar: '',
        domain: '',
        available: false,
      });

      Swal.fire({
        title: 'Hello!',
        text: response.data.msg,
        icon: 'success',
        confirmButtonText: 'OK'
      });

      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Avatar URL:
          <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
        </label>
        <label>
          Domain:
          <select name="domain" value={formData.domain} onChange={handleChange}>
            <option value="">Select Domain</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
            <option value="UI Designing">UI Designing</option>
            <option value="Business Development">Business Development</option>
          </select>
        </label>
        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
