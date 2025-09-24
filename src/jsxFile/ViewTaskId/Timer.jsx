import '../../cssFile/ViewTaskId-css/Timer.css';
import Button from '../Help/Button';
import { useState, useEffect, useRef } from 'react';
import formatHours from '../Help/FormatedHours'

export default function Timer({ taskId, setAct }) {
  const [timer, setTimer] = useState({ time: 0, stop: "", isStart: false });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!timer.isStart) return;

    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        const newTime = prev.time + 1;


        const stopMsg = newTime % 5 === 0 ? "Stop Task" : "";

        if (newTime % 60 === 0) {
          addOneMinute();
        }

        return { ...prev, time: newTime, stop: stopMsg };
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timer.isStart]);


  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };



  async function addOneMinute() {
    try {
      console.log("timr send");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/addOneMinut/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.notLogin) {
        window.location.href = "/login";
        return;
      }
      if (!data.error) {
        setAct(pre => ({
          ...pre,
          extra: {
            ...pre.extra,
            spend: formatHours((pre.extra.spend || 0) + 0.0167)
          }
        }));
      }

    } catch (err) {
      console.error("Error from server:", err);
    }
  }

  return (
    <div className="timerdiv isFlex">
      {timer.isStart ? (
        <Button
          fn={() => setTimer(prev => ({ ...prev, isStart: false, time: 0 }))}
          typ={2}
          msg={timer.stop !== '' ? timer.stop : formatTime(timer.time)}
        />
      ) : (
        <Button
          fn={() => setTimer(prev => ({ ...prev, isStart: true }))}
          msg="Start task"
          typ={1}
        />
      )}
      <div className={timer.isStart ? "redbtntmer runtimerdiv" : "redbtntmer"}></div>
    </div>
  );
}
