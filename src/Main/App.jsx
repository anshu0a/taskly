import React from "react";
import { useLocation } from "react-router-dom";
import Junction from './Junction';
import Switch from "../jsxFile/Switch/OverSwitch";

export default function App() {
  const location = useLocation();
  return (
    !location.pathname.toLowerCase().startsWith("/taskly") ? (
      <div>other</div>
    ) : (
      <Switch />
    )
  );
}
