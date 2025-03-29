import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from "./Users";
import Createusers from "./Createusers";
import Updateusers from "./Updateusers";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/Createusers" element={<Createusers/>}></Route>
          <Route path="/Updateusers/:id" element={<Updateusers />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
