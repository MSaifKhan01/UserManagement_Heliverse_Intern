const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connecting } = require("./Config/db");
const { userRouter } = require("./Routes/user");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api",userRouter)



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
