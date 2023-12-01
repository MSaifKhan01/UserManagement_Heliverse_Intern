const express = require("express");



const {userModel}= require("../Models/user")
const {teamModel}=require("../Models/team")
const {auth}=require("../Middleware/auth")

const jwt = require("jsonwebtoken");
const userRouter=express.Router()






// adding user
userRouter.post("/users", async (req, res) => {
    try {
      const { email } = req.body;
  
      // Checking if a user with the same email already exists
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).send({ msg: "User already exists" });
      }
  
      const newUser = new userModel({ ...req.body });
      await newUser.save();
  
      res.status(201).send(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  
  // geting all users
  userRouter.get("/users", async (req, res) => {
    try {
      const query = {};
  
      if (req.query.domain) {
        query.domain = req.query.domain;
      }
  
      if (req.query.gender) {
        query.gender = req.query.gender;
      }
  
      if (req.query.available) {
        query.available = req.query.available;
      }
  
      const page = Number(req.query.page); // No default page, it will be undefined if not provided
      const limit = 20;
  
      // searching functionality
      if (req.query.search) {
        // regular expression for case-insensitive search
        query.$or = [
          { first_name: { $regex: req.query.search, $options: "i" } },
          { last_name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { avatar: { $regex: req.query.search, $options: "i" } },
          { domain: { $regex: req.query.search, $options: "i" } },
        ];
      }
  
      let users;
  
      if (page) {
        // If page is provided, apply pagination
        users = await userModel.find(query).skip((page - 1) * limit).limit(limit);
      } else {
        // If page is not provided, return all users
        users = await userModel.find(query);
      }
  
      res.send(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  
  
  // geting user by id
  userRouter.get("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
  
      
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      res.send(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  // updating the user by id
  userRouter.put("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
  
      
      const existingUser = await userModel.findById(userId);
  
      if (!existingUser) {
        return res.status(404).send({ msg: "User not found" });
      }
  
    
      const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
        new: true, 
      });
  
      res.send(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  // deleting the user by id
  
  userRouter.delete("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
  
  
      const userToDelete = await userModel.findById(userId);
  
      if (!userToDelete) {
        return res.status(404).send({ msg: "User not found" });
      }
  
    
      await userModel.findByIdAndDelete(userId);
  
      res.send({ msg: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  userRouter.post("/users/login", async (req, res) => {
    let { email } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        res.status(200).send({
          msg: "Login successfully",
          user,
          token: jwt.sign({ userID: user._id }, "jammi", { expiresIn: "3h" }),
        });
      } else {
        res.status(400).send({ msg: "Login failed" });
      }
    } catch (err) {
      res.status(400).send({ msg: err.message }); 
    }
  });
  
  // POST /api/team
  userRouter.post("/team", auth, async (req, res) => {
    try {
      const token = req.headers.authorization;
      console.log("tokek from route",token)
      const decoded = jwt.verify(token, "jammi");
      console.log("decode",decoded  ,"---Token",token)
  
      const { memberId } = req.body;
  
      const existingTeam = await teamModel.findOne({ userID: decoded.userID, memberId });
  console.log(existingTeam)
      if (!existingTeam) {
        console.log("inner")
        const newTeam = new teamModel({
          userID: decoded.userID,
          memberId,
        });
        console.log("outer")
        await newTeam.save();
  
        res.status(201).json({ data: newTeam, msg: "Team created successfully" });
      } else {
        res.status(200).json({ msg: "Member already exists in the team" });
      }
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });
  
  // GET /api/team/:id
  userRouter.get("/team/:id", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "jammi");
    const { id } = req.params; 
  
    try {
      if (decoded) {
        const team = await teamModel
          .find({ userID: id })
          .populate("memberId");
  
        console.log(team);
        res.status(200).send(team);
      }
    } catch (err) {
      res.status(400).send({ msz: err.message });
    }
  });

  module.exports={
    userRouter
  }