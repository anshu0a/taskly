import "../../cssFile/Home-css/OutHome.css"
import { useState, useEffect } from "react"

import AddTask from './AddTask'
import MyTask from './Private/MyTask'
import FrndTask from './Public/FrndTask'



export default function outHome({ myFeed }) {
    const [isLoading, setIsloading] = useState({ is: false, msg: "" });
    const [data, setData] = useState([]);
   
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function userRegister() {
            try {
                setIsloading((pre) => ({ ...pre, is: true }));
                const response = await fetch(myFeed
                    ? `${import.meta.env.VITE_API_URL}/api/myAllTasks`
                    : `${import.meta.env.VITE_API_URL}/api/otherAllTasks`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    credentials: "include",
                });

                const data = await response.json();
                if (data.notLogin) {
                    window.location.href = "/login";
                }
                if (!data.error) {
                    setData(data.data);
                    setUser(data.user);
                    setIsloading((pre) => ({ ...pre, is: false }));
                } else {
                    setIsloading((pre) => ({ ...pre, msg: data.message + ' %-+% ' + Date.now() + Date.now() }));
                }


            } catch (err) {
                console.log("Error from server at home :", err);
            }
        }

        userRegister();
    }, [myFeed]);


    return (<>
        {
            <>
                <div className='top'>
                    <div className="hometop">
                        <p className="topinfo">Taskland<br /><span>Every task is a quest. Complete them all!</span></p>
                        <AddTask msg="Add Task" type="task" />
                    </div>
                </div>
                <div className='mainBody'>
                    <div className="outhome isFlex">
                        <div className="allopt isFlex">
                            <div onClick={() => window.location.replace("/taskly/private")} className={myFeed ? "opt12  inopt" : "opt12"}>Private</div>
                            <div onClick={() => window.location.replace("/taskly/global")} className={!myFeed ? "opt12  inopt" : "opt12"}>Global</div>
                        </div>
                        {myFeed ?
                            <MyTask data={data} user={user} setData={setData} isloading={isLoading.is} />
                            :
                            <FrndTask data={data} user={user} setData={setData} isloading={isLoading.is} />
                        }
                    </div>
                </div>
            </>
        }</>)
}