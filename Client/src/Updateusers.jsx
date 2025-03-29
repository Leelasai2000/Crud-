import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Updateusers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  // Fetch existing user data on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/getUser/${id}`);
        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetch();
  }, [id]);

  // Submit updated user data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    try {
      await axios.put(`http://localhost:5001/updateUser/${id}`, {
        name,
        email,
        age,
      });
      navigate("/"); // Redirect to home page after successful update
    } catch (error) {
      console.log("❌ Error updating user:", error);
    }
  };

  return (
    <div className="d-flex p-2 justify-content-center align-items-center bg-primary vh-100">
      <div className="w-50 bg-white p-5">
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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

export default Updateusers;
