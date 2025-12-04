import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Switch from "../jsxFile/Switch/OverSwitch";
import Login from '../jsxFile/Login/MainLogin';
import Create from '../jsxFile/Create/MainCreate';
import NotFound from '../jsxFile/Help/notFound';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

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
