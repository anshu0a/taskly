import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Switch from "../jsxFile/Switch/OverSwitch";
import Login from '../jsxFile/Login/MainLogin';
import Create from '../jsxFile/Create/MainCreate';
import NotFound from '../jsxFile/Help/notFound'

export default function App() {

  // useEffect(() => {
  //   let deviceId = localStorage.getItem("device_id");
  //   if (!deviceId) {
  //     deviceId = uuidv4();
  //     localStorage.setItem("device_id", deviceId);
  //   }
  //   console.log("Unique Device ID:", deviceId);
  // }, []);


  return (
    <Routes>
      <Route path="/taskly/*" element={<Switch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
      <Route
        path="/"
        element={
          <div>
            <Link to="/taskly/global">Home</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Link to="/create">Create</Link>
          </div>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
