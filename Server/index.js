// Importing dependencies
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

// Connecting to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Crud", {
        });
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.log("Mongoose connection failed", err);
    }
};
connectDB();

// Create operation: POST request to add a user
app.post("/CreateUsers", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new UserModel({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

//Read operation to fetch and display the data in mongodb to to fornt end:-

app.get("/getusers",async(req,res)=>{
  try{
     const users=await UserModel.find();
     res.status(201).json({users});
  }
  catch(error){
    console.log("error while fetching",error);
    res.status(500).json({messgae:'error while fetching the data',message});
  }
})
//fetch the exixted data:-
app.get("/getUser/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user by ID" });
  }
});
//updated data is coming to backedn
app.put("/updateUser/:id",async(req,res)=>{
  try{
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  }
  catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
})
//delete the user:-
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;  // Extract the user ID from the request parameters
    let user = await UserModel.findByIdAndDelete(id); // Find and delete the user in the database

    console.log("User deleted"); // Log confirmation to the server
    res.status(200).json({}); // Send a success response with status 200
  } catch (error) {
    console.log("Error while deleting", error); // Log the error if something goes wrong
    res.status(500).json({ message: "Something went wrong", error }); // Send an error response
  }
});

// Start the server
app.listen(5001, () => {
    console.log("Server connected Successfully on port 5001");
});
