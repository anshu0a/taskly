import { useState } from "react";
import '../../cssFile/Login-css/Inputs.css'

import Button from '../Help/Button'
import Loading from '../Help/Loading'
import QuickMsg from '../Help/Quickmsg'

export default function MainLogin() {
  const [value, setValue] = useState({ user: "", pass: "" });
  const [wait, setWait] = useState({ isload: false, loadmsg: '', quick: "", error: false })

  function addInput(e) {
    const { value: newVal, name } = e.target;
    let sanitizedVal = newVal;

    if (name === "user") {
      sanitizedVal = newVal.toLowerCase().replace(/ /g, "_");
      const regex = /^(?![0-9.])(?!.*[._]{2})[A-Za-z0-9._]{0,26}$/;
      if (sanitizedVal.length > 26 || !regex.test(sanitizedVal)) return;
    }
    setValue((pre) => ({ ...pre, [name]: sanitizedVal }));
  }

  async function tryingToLogin() {
    try {
      setWait((pre) => ({ ...pre, isload: true, msg: "We are just checking...", quick: "", error: false, }));

      const response = await fetch("/https://tasklyserver-0ux1.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: value.user, password: value.pass }),
      });

      const data = await response.json();
      if (data.message == 'Incorrect password') setValue((pre) => ({ ...pre, pass: "" }));
      else setValue((pre) => ({ ...pre, user: "", pass: "" }));
      if (!data.error) {
        setWait((pre) => ({ ...pre, isload: false, msg: "", quick: data.message, error: false, }));
        localStorage.setItem("token", data.token);
        window.location.replace('./taskly/private')
      } else {
        setWait((pre) => ({ ...pre, isload: false, msg: "", quick: data.message || "Login failed", error: true, }));
      }
    } catch (err) {
      setWait((pre) => ({ ...pre, isload: false, msg: "", quick: "Network or server error", error: true, }));
      console.error("Error sending data:", err);
    }
  }



  return (
    <form
      className="logininpdiv isFlex"
      onKeyDown={(e) => {
        if (e.key === "Enter" && value.user !== "" && value.pass !== "") {
          e.preventDefault(); // stop page reload
          tryingToLogin();
        }
      }}
    >
      <label htmlFor="user">Your Username ?</label>
      <input
        value={value.user}
        name="user"
        onInput={addInput}
        id="user"
        autoComplete="off"
        placeholder="Eg. who.is.anshu"
        className="logininp"
      />

      <label htmlFor="pass">Your Password ?</label>
      <input
        type="password"
        value={value.pass}
        name="pass"
        onInput={addInput}
        id="pass"
        autoComplete="off"
        placeholder="Your secure password"
        className="logininp"
      />

      <div className="btndivlogin">
        <div className="okbtnis isFlex">
          {value.user !== "" && value.pass !== "" && (
            <Button fn={tryingToLogin} msg={"Login as " + value.user} typ={5} />
          )}
        </div>
      </div>
      <Loading msg={wait.loadmsg} show={wait.isload} />
      <QuickMsg msg={wait.quick} error={wait.error} />
    </form>

  );
}
