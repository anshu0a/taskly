import { Routes, Route } from "react-router-dom";

let About = () => <>hello to About</>;
import Home from "../jsxFile/Home/OutHome"

export default function Junction() {
  return (
    <Routes>
      <Route path="/taskly/tasks" element={<Home />} />
      <Route path="/taskly/about" element={<About />} />
    </Routes>
  );
}
