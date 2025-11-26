
import { Routes, Route } from "react-router-dom";
import Home from "../jsxFile/Home/OutHome";
import AddingOneTask from '../jsxFile/Home/AddingOneTask'
import NotFound from '../jsxFile/Help/notFound'
import ViewTaskId from '../jsxFile/ViewTaskId/ViewTask'
import Timer from '../jsxFile/Timer/MainTimer'
import Challenges from  '../jsxFile/Challenges/MainChallenges'
import Devlopment from  '../jsxFile/Devlopment/UnderDevlopment.jsx'
import CreateChallenges from '../jsxFile/CreateChallenges/MainCreate.jsx'
import Profile from '../jsxFile/Profile/MainProfile.jsx'

export default function Junction() {
  return (
    <Routes>
      <Route path="private" element={<Home myFeed={true} />} />
      <Route path="global" element={<Home myFeed={false} />} />
      <Route path="add-task" element={<AddingOneTask />} />
      <Route path="task/:taskId" element={<ViewTaskId />} />
      <Route path="timers" element={<Devlopment />} />
      <Route path="challenges/private" element={<Challenges myFeed={true}/>} />
      <Route path="challenges/global" element={<Challenges myFeed={false}/>} />
      <Route path="create_challenges" element={<CreateChallenges />} />
      <Route path="settings" element={<Devlopment />} />
      <Route path="profile/:person" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
      
      
    </Routes>
  );
}
