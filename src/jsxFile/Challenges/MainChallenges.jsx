import '../../cssFile/Challenges-css/MainChallenges.css'
import "../../cssFile/Home-css/OutHome.css"
import { useState, useEffect } from 'react'
import Quick from '../Help/NewQuick'
import AddChallenges from '../Home/AddTask'
import AllFeed from './AllFeed'
import NoTask from '../Home/NoTask';
import Loader from '../Home/Private/Loader'

export default function maintimer({ myFeed }) {
    const [data, setData] = useState({ loading: true, dares: [], msg: "", })
    useEffect(() => {
        async function userRegister() {
            try {
                // setIsloading((pre) => ({ ...pre, is: true }));
                const response = await fetch(myFeed
                    ? `${import.meta.env.VITE_API_URL}/api/myAllDares`
                    : `${import.meta.env.VITE_API_URL}/api/otherAllDares`, {
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
                    setData((pre) => ({ ...pre,dares:data.dares, loading: false }));

                } else {
                    setData((pre) => ({ ...pre, msg: data.message }));
                }


            } catch (err) {
                setData((pre) => ({ ...pre, msg: "sonthing went wrong" }))
                console.log("Error from server at main Challenges page :", err);
            }
        }

        userRegister();
    }, [myFeed]);
    return (<>
        <>
            <div className='top'>
                <div className="hometop">
                    <p className="topinfo">Challengify<br /><span>Where Every Task Becomes a Triumph!</span></p>
                    <AddChallenges msg="Create" type="chg" />
                </div>
            </div>
            <div className='mainBody'>
                <div className="outhome isFlex">
                    <div className="allopt isFlex">
                        <div onClick={() => window.location.replace("/taskly/challenges/private")} className={myFeed ? "opt12  inopt" : "opt12"}>Private</div>
                        <div onClick={() => window.location.replace("/taskly/challenges/global")} className={!myFeed ? "opt12  inopt" : "opt12"}>Global</div>
                    </div>
                    {
                        !data.loading ?
                            data.dares.length != "" ?
                                <AllFeed myFeed={myFeed} dares={data.dares} setData={setData} /> 
                                :
                                <NoTask msg="Create first challenges" pic={myFeed ? 4 : 3} />
                            :
                            <div className="loaderatChaalengrs isFlex">
                                {Array.from({ length: 12 }, (_, i) => <Loader key={i} />)}
                            </div>
                    }
                    <Quick msg={data.msg} setMsg={setData} />
                </div>
            </div>
        </>
    </>)
}