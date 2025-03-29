import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/getUsers");
      setUsers(res.data.users); // Set fetched users in state
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/deleteUser/${id}`);
      fetchUsers(); // Refresh user list after successful deletion
    } catch (error) {
      console.log("❌ Error deleting user:", error);
    }
  };

  return (
    <React.Fragment>
      <h2 className="text-center my-3">Users</h2>
      <div className="d-flex p-2 justify-content-center align-items-center bg-primary vh-100">
        <div className="w-75 bg-white p-5 rounded">
          <Link to="/Createusers" className="btn btn-primary mb-3">
            ➕ Add User
          </Link>
          <table className="table table-hover table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>India</td>
                  <td>
                    <Link to={`/Updateusers/${user._id}`}>
                      <button className="btn btn-warning btn-sm me-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;
