import '../../../cssFile/Home-css/OneTask.css'
import dateformate from "../../Help/dayAgo"
import Verifyer from '../../Help/Verifyer'
import RandomPic from '../../Help/RandomPic'
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function onetask({ type, data, user, setData, setMsg }) {
    const location = useLocation();
    const [error, setError] = useState(false);
    const [isverify, setIsverify] = useState(false)


    async function taskAddKro() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pullPushTask/${data.task._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
            });

            const result = await res.json();
            console.log(result);

            if (result.notLogin) {
                window.location.href = "/login";
            }
            setMsg((pre) => ({ ...pre, msg: result.message }))
            if (!result.error) {
                setData(prevData => prevData.filter(item => item.task._id.toString() !== data.task._id.toString()));
            }
        } catch (err) {
            setMsg((pre) => ({ ...pre, msg: err.message || "Error from server" }))
            console.error("Error toggling task:", err);
        }
    }

    function swchToOneTask() {
        if (type == 'public') localStorage.setItem("type", "89478tnv5n8y5y495yn459ynt784u");
        else localStorage.setItem("type", "tny58n5y78y5b7yt757w4b58ngb57");
        window.location.href = `/taskly/task/${data.task._id}`
    }


    return (
        <div className='outonetask'>
            {isverify && <Verifyer setRemove={setIsverify} fn={taskAddKro} msg={data.task.title} />}
            <div className="onetask">
                <img className='taskimg' src={data.task.img}></img>
                <div onClick={swchToOneTask} className="taskDetails isFlex">
                    <p className='title'><b>{data.task.title}</b></p>
                    <p className='purpose'>{data.task.purpose}</p>
                </div>
                <div className='timelineday'>{data.task.timeLine <= 1 ? data.task.timeLine + " day" : data.task.timeLine + " days"}</div>
            </div>
            <div className='userdata isFlex'>
                <div className="outuserimg">
                    {!error ?
                        <img
                            className="ownerpicinprivate"
                            src={data.owner.pic || "jnj"}
                            onError={() => setError(true)}
                            alt={data.owner.name}
                        />
                        :
                        <RandomPic width={38} />
                    }
                    <div className="userinfo">
                        <p>{data.owner.name}</p>
                        <p className='tymm'>{dateformate(data.task.createdAt)}</p>
                    </div>
                </div>

                {
                    data.owner.name != user &&
                    <>
                        {
                            location.pathname != "/taskly/private" ?
                                <svg onClick={taskAddKro} className='btndivinprivate' viewBox="0 8 64 64" strokeWidth="3" fill="none">
                                    <path d="M15.68,53.05,8.27,41.89a1.19,1.19,0,0,1,.34-1.66l4.68-3a1.21,1.21,0,0,1,1.64.32l7.56,11a1.2,1.2,0,0,1-.32,1.67l-4.82,3.24A1.2,1.2,0,0,1,15.68,53.05Z" strokeLinecap="round"></path>
                                    <path d="M15.76,38.68l7.8-4.91a2.21,2.21,0,0,1,1.7-.26c2.77.71,11.1,3,14.17,4.08,2.31.81,3.24,3.08,2.31,4.59-1.26,2-3.18,1.8-4.56,1.41a3.62,3.62,0,0,1-.55-.2l-5.46-2.32" strokeLinecap="round"></path>
                                    <path d="M21.81,47.52l2.55-1.46,14.43,4a1.09,1.09,0,0,0,.88-.14c2-1.3,10.71-7.07,15-10.1a2.39,2.39,0,0,0,.3-4,3.1,3.1,0,0,0-3.71-.33c-1.5.84-5.67,3.94-5.67,3.94" strokeLinecap="round"></path>
                                </svg>
                                :
                                <svg onClick={() => setIsverify(true)} className="delbtnexist" viewBox="-6 -6 35 35" fill="none">
                                    <path d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z" ></path>
                                    <path d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z" ></path>
                                    <path d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z" ></path>
                                    <path d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z" ></path>
                                    <path d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z" ></path>
                                </svg>
                        }</>

                }
            </div>

        </div>
    )
}