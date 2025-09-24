
import { Routes, Route } from "react-router-dom";
import Home from "../jsxFile/Home/OutHome";
import AddingOneTask from '../jsxFile/Home/AddingOneTask'
import NotFound from '../jsxFile/Help/notFound'
import ViewTaskId from '../jsxFile/ViewTaskId/ViewTask'
import Timer from '../jsxFile/Timer/MainTimer'

let About = () => <>hello to About</>;

export default function Junction() {
  return (
    <Routes>
      <Route path="private" element={<Home myFeed={true} />} />
      <Route path="global" element={<Home myFeed={false} />} />
      <Route path="add-task" element={<AddingOneTask />} />
      <Route path="task/:taskId" element={<ViewTaskId />} />
      <Route path="timers" element={<Timer />} />
      <Route path="challenges" element={<Timer />} />
      <Route path="settings" element={<Timer />} />
      <Route path="undefined" element={<Timer />} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}
