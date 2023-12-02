const express = require("express");
const { userModel } = require("../Models/user");
const { teamModel } = require("../Models/team");
const { auth } = require("../Middleware/auth");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// Adding user
userRouter.post("/users", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    const newUser = new userModel({ ...req.body });
    await newUser.save();

    res.status(201).send({ msg: "User Added",newUser });
  } catch (error) {
    
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Getting all users
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

    const page = Number(req.query.page);
    const limit = 20;
    let usersDataLength = await userModel.find().count();
    let totalPage = Math.ceil(usersDataLength / 20);

    if (req.query.search) {
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
      users = await userModel.find(query).skip((page - 1) * limit).limit(limit);
    } else {
      users = await userModel.find(query);
    }

    res.status(200).send({ users, totalPage });
  } catch (error) {
    
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Getting user by id
userRouter.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.status(200).send({ user });
  } catch (error) {
   
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Updating the user by id
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

    res.status(200).send({ msg: "User Updated",updatedUser });
  } catch (error) {
    
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Deleting the user by id
userRouter.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const userToDelete = await userModel.findById(userId);

    if (!userToDelete) {
      return res.status(404).send({ msg: "User not found" });
    }

    await userModel.findByIdAndDelete(userId);

    res.status(200).send({ msg: "User deleted successfully" });
  } catch (error) {
    
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// User login
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

// Creating team
userRouter.post("/team", auth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "jammi");

    const { memberId } = req.body;

    const existingTeam = await teamModel.findOne({
      userID: decoded.userID,
      memberId,
    });

    if (!existingTeam) {
      const newTeam = new teamModel({
        userID: decoded.userID,
        memberId,
      });

      await newTeam.save();

      res.status(201).send({ data: newTeam, msg: "Member Added successfully" });
    } else {
      res.status(200).send({ msg: "Member already exists in the team" });
    }
  } catch (error) {
   
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
});

// Get team by user id
userRouter.get("/team/:id", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "jammi");
  const { id } = req.params;

  try {
    if (decoded) {
      const team = await teamModel.find({ userID: id }).populate("memberId");

      res.status(200).send(team);
    }
  } catch (err) {
    res.status(400).send({ msz: err.message });
  }
});

module.exports = {
  userRouter,
};
