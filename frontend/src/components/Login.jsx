import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  
  const [email, setEmail] = useState('');

  const navigate=useNavigate()
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://usermanagement-g8b8.onrender.com/api/users/login', { email });
 

  
      sessionStorage.setItem('userID', response.data.user._id);
      sessionStorage.setItem('token', response.data.token);
      console.log(response.data)

      Swal.fire({
        title: `Hello! ${response.data.user.first_name
        }`,
        text: response.data.msg,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate("/")

    
      
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
    
        text: "Something went wrong",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
    
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
