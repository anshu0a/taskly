import '../../cssFile/ViewTaskId-css/Functions.css'
import Buton from '../Help/Button'
import { useState } from 'react';
import QuickMsg from '../Help/NewQuick'
import Verifyer from '../Help/Verifyer'
import Loading from '../Help/Loading'

export default function functions({ user, taskId, isDone, setAct, title }) {
    const [msg, setMsg] = useState({ msg: '', loading: false, loading2: false, lodmsg: "" });
    const [remove, setRemove] = useState(false);


    async function toggletask(mth) {
        if (msg.loading) return;
        try {
            setMsg((pre) => ({ ...pre, loading: true, msg: '',lodmsg:"Marking task" }));
            const search = localStorage.getItem("type").endsWith('u') ? "public" : "personal";
            const response = await fetch(`/https://tasklyserver-0ux1.onrender.com/api/markToggle/${taskId}/${search}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ mth: mth }),
            });

            const data = await response.json();
            if (data.notLogin) {
                window.location.href = "/login";
            }
            setMsg((pre) => ({ ...pre, loading: false, msg: data.message, lodmsg: "" }));
            if (!data.error) {
                setAct((pre) => ({ ...pre, extra: { ...pre.extra, isDone: mth } }))
            }
        } catch (err) {
            console.log("Error in function view:", err);
            setMsg((pre) => ({
                ...pre, lodmsg: "", loading: false, msg: err.message || "Server side error" }));
        }
    }

        async function killTask() {

            if (msg.loading) return;
            try {
                setMsg((pre) => ({ ...pre, loading2: true, msg: '',lodmsg:"Killing task." }));
                const search = localStorage.getItem("type").endsWith('u') ? "public" : "personal";
                const response = await fetch(`/https://tasklyserver-0ux1.onrender.com/api/killTask/${taskId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });

                const data = await response.json();
                if (data.notLogin) {
                    window.location.href = "/login";
                }
                console.log("Data from server in functions :", data);
                setMsg((pre) => ({ ...pre, loading2: false, msg: data.message,lodmsg:"" }));
                if (!data.error) {
                    window.history.back();
                }
            } catch (err) {
                console.log("Error in function view:", err);
                setMsg((pre) => ({ ...pre, loading2: false,lodmsg:"", msg: err.message || "Server side error" }));
            }
        }


        return (<div className='functionsviewx'>
            {remove && <Verifyer msg={title} setRemove={setRemove} fn={killTask} />}
            {isDone ?
                <div className='bdrbxview isFlex'>
                    <h2>Mark task as incomplete</h2>
                    <p>Somthing is missing in your task? you have rights to continue your task.</p>
                    <div className='btddivview'>
                        <br></br>
                        <Buton fn={() => toggletask(false)} typ={5} msg={"Unfinished task"} />
                    </div>
                </div>
                :
                <div className='bdrbxview isFlex'>
                    <h2>Mark task as done</h2>
                    <p>When you done you task then you will free to mark as done to your task.</p>
                    <div className='btddivview'>
                        <br></br>
                        <Buton fn={() => toggletask(true)} typ={5} msg={"Finish task"} />
                    </div>
                </div>}
            <div className='bdrbxview btnview1 isFlex'>
                <h2>Kill task permanently</h2>
                <p>When you kill your task then you can't retrive it back. so make sure while killing</p>
                <div className='btddivview'>
                    <br></br>
                    <Buton fn={() => setRemove(true)} typ={2} msg="Delete task" />
                </div>
            </div>
            <QuickMsg msg={msg.msg} setMsg={setMsg} />
            <Loading msg={msg.lodmsg} show={msg.loading2 || msg.loading} />
        </div>)
    }
