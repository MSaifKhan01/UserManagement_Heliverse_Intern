import { Routes, Route } from "react-router-dom";
import UserList from "./userList";
import UpdateUserForm from "./updateUser";
import UserDetails from "./userCard";
import AddUserForm from "./AddUser";
import Login from "./Login";
import TeamDetails from "./Team";
import Navbar from "./Navbar";

function Path() {
  return (
    <Routes>
      
      <Route path="/" element={<UserList />} />
      <Route path="/nav" element={<Navbar />} />

      <Route path="/Login" element={<Login />} />
      <Route path="/update/:id" element={<UpdateUserForm />} />
      <Route path="/user/:id" element={<UserDetails />} />

      <Route path="/user/add" element={<AddUserForm />} />
      <Route path="/user/Team" element={<TeamDetails />} />
    </Routes>
  );
}

export default Path;
