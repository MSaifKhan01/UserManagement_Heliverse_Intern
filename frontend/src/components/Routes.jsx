import { Routes, Route } from "react-router-dom";





import UserListPage from "../Pages/UserListPage";
import LoginPage from "../Pages/LoginPage";
import UpdateUserPage from "../Pages/UpdateUserPage";
import UserDetailsPage from "../Pages/UserDetailsPage";
import AddUserPage from "../Pages/AddUserPage";
import TeamPage from "../Pages/TeamPage";


function Path() {
  return (
    <Routes>
      
      <Route path="/" element={<UserListPage />} />
      

      <Route path="/Login" element={<LoginPage />} />
      <Route path="/update/:id" element={<UpdateUserPage />} />
      <Route path="/user/:id" element={<UserDetailsPage />} />

      <Route path="/user/add" element={<AddUserPage />} />
      <Route path="/user/Team" element={<TeamPage />} />
    </Routes>
  );
}

export default Path;
