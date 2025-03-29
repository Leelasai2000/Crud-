import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let Createusers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, age };
      await axios.post("http://localhost:5001/CreateUsers", userData, {
        headers: { "Content-Type": "application/json" }
      });
      alert("✅ User created successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error creating user:", error);
      alert("Something went wrong while creating the user.");
    }
  };
  

  return (
    <div className="d-flex align-items-center bg-primary justify-content-center p-2 vh-100">
      <div className="bg-white p-5 w-50">
        <form onSubmit={handleSubmit}>
          <h2>Add user</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-success m-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createusers;
