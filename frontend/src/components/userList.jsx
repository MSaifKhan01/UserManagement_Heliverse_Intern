import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    available: "",
  });

  const handleSelectUser = async (selectedUserId) => {
    try {
      // Implement logic to add user to the team
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "https://usermanagement-g8b8.onrender.com/api/team",
        { memberId: selectedUserId },
        {
          headers: {
            Authorization: token ? `${token}` : "",
          },
        }
      );

      Swal.fire({
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      });

      console.log("User added to the team:", response.data);

      // Update the teamMembers state with the added user ID
    } catch (error) {
      console.error("Error adding user to the team:", error);
      Swal.fire({
        text: "Something went wrong",
        icon: "failer",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Implement logic to delete user
      const response = await axios.delete(
        `https://usermanagement-g8b8.onrender.com/api/users/${userId}`
      );
      console.log("User deleted:", response.data);
      Swal.fire({
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://usermanagement-g8b8.onrender.com/api/users?page=${page}&search=${searchQuery}`,
        { params: filters }
      );
      setUsers(response.data.users);
      console.log(response.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFilterChange = (filter, value) => {
    setFilters({ [filter]: value });
  };

  const handlePageChange = (newPage) => {
    // Updating the current page
    setPage(newPage);
  };

  useEffect(() => {
    fetchUsers();
    // usersLength()
  }, [searchQuery, page, filters]);

  return (
    <div>
      <div className="filterBoxes">
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label>Domain:</label>
          <select
            value={filters.domain}
            onChange={(e) => handleFilterChange("domain", e.target.value)}
          >
            <option value="">All</option>
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
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Available:</label>
          <select
            value={filters.available}
            onChange={(e) => handleFilterChange("available", e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div>
              <Link to={"/user/" + user._id}>
                <img src={user.avatar} alt="User Avatar" />
              </Link>
            </div>

            <p>
              Name: {user.first_name} {user.last_name}
            </p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>Domain: {user.domain}</p>
            <p>Available: {user.available ? "Yes" : "No"}</p>

            <button onClick={() => handleSelectUser(user._id)}>
              Add To Team
            </button>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <button>
              <Link to={"/update/" + user._id}>Update User</Link>
            </button>
          </div>
        ))}
      </div>
      <div class="btnsContainer">
        {Array(totalPages)
          .fill()
          .map((ele, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default UserList;
