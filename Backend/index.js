const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connecting } = require("./Config/db");
const { userModel } = require("./Models/user");



const app = express();
app.use(express.json());
app.use(cors());

// adding user
app.post("/api/users", async (req, res) => {
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
app.get("/api/users", async (req, res) => {
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

    const page = Number(req.query.page) || 0;
    const limit = 20;

    // searching functionality
    if (req.query.search) {
      //  regular expression for case-insensitive search
      query.$or = [
        { first_name: { $regex: req.query.search, $options: "i" } },
        { last_name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { avatar: { $regex: req.query.search, $options: "i" } },
        { domain: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const users = await userModel
      .find(query)
      .skip(page * limit)
      .limit(limit);

    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// geting user by id
app.get("/api/users/:id", async (req, res) => {
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
app.put("/api/users/:id", async (req, res) => {
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

app.delete("/api/users/:id", async (req, res) => {
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

app.listen(process.env.PORT, async () => {
  try {
    await connecting;
    console.log("Connected to Database Succesfully");
  } catch (error) {
    console.log(error);
    console.log("error Occured while connectng to db");
  }
  console.log("server is connected to port number 4000");
});
