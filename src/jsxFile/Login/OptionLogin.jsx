import { useState, useEffect, useRef } from 'react';
import '../../cssFile/Login-css/Optionlogin.css';
import Loading from '../Help/Loading';
import QuickMsg from '../Help/Quickmsg';

export default function OptionLogin() {
  const [wait, setWait] = useState({ isload: false, loadmsg: '', quick: "", error: false });
  const popupRef = useRef(null);


  useEffect(() => {
    function handleMessage(event) {
      console.log("comming");
      const apiUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
      if (event.origin !== apiUrl) return;
      console.log("passing 1 step");
      const { token, message } = event.data;
      if (token) {
        console.log("intoken");
        localStorage.setItem("token", token);
        setWait(prev => ({ ...prev, isload: false, quick: message, error: false }));
        window.location.replace('/taskly/private');
      } else if (message) {
        console.log("not in token but in msg");
        setWait(prev => ({ ...prev, isload: false, quick: message, error: true }));
      }
      console.log("not in every whereg");
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);


  async function loginbyGoogle() {
    setWait({ isload: true, loadmsg: "Opening Google login...", quick: "", error: false });
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
    popupRef.current = window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, "googleLogin" + Date.now(), "width=1000,height=600");
    if (!popupRef.current) {
      setWait(prev => ({ ...prev, isload: false, quick: "Popup blocked! Allow popups.%-+%" + Date.now(), error: true }));
    }
  }

  return (
    <div className="optionlogin">
      <div onClick={loginbyGoogle} className='isFlex oneoptn'>
        <img className="imgdir" src="./Svg/google.svg" alt="Google" />
        <p>Google</p>
      </div>
      <div className='isFlex oneoptn'>
        <img className="imgdir" src="./Svg/guest.svg" alt="Guest" />
        <p>Guest</p>
      </div>
      <div onClick={() => window.location.replace("./create")} className='isFlex oneoptn'>
        <img className="imgdir" src="./Svg/create.svg" alt="Create" />
        <p>Create</p>
      </div>
      <Loading msg={wait.loadmsg} show={wait.isload} />
      <QuickMsg msg={wait.quick} error={wait.error} />
    </div>
  );
}
