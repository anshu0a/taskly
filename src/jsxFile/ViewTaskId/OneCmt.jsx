import '../../cssFile/ViewTaskId-css/Comments.css'
import { useState } from 'react'
import formotedtime from '../Help/dayAgo'
import RandomPic from '../Help/RandomPic'
export default function comments({ cmt, setAct, user, userId, taskId, my, setMsg }) {
    const [err, setErr] = useState(false);
    const [lod, setLod] = useState(false)

    async function delCmt() {
        try {
            setMsg((pre) => ({ ...pre, loading: true, }));
            setLod(true)
            const search = localStorage.getItem("type").endsWith('u') ? "public":"personal";
            const response = await fetch(`/https://tasklyserver-0ux1.onrender.com/api/removeCmt/${userId}/${taskId}/${cmt._id}/${search}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();
            setLod(false)
            if (data.notLogin) {
                window.location.href = "/login";
            }
            setMsg((pre) => ({ ...pre, loading: false, msg: data.message }));
            if (!data.error) {
                setAct((pre) => ({ ...pre, extra: { ...pre.extra, cmt: data.tasks} }))
            }
        } catch (err) {
            console.log("Error from server:", err);
            setLod(false)
            setMsg((pre) => ({ ...pre, msg: err.message || "Server side error " }));
        }

    }


    return (
        <div className="onecmt">
            {!err ?
                <img
                    className="picview"
                    src={cmt.person.photo || "jnj"}
                    onError={() => setErr(true)}
                />
                :
                <RandomPic width={38} />

            }
            <div className="textview isFlex">
                <div className="userdtnview isFlex">
                    <p className="usernmview">{cmt.person.username}</p>
                    <p className="tymview">{formotedtime(cmt.createdAt)}</p>
                    {user == cmt.person._id &&
                        (!lod ?
                            <svg onClick={delCmt} className='del' viewBox="-4 1 32 24"  >
                                <path d="M7.26279 3.25871C7.38317 2.12953 8.33887 1.25 9.5 1.25H14.5C15.6611 1.25 16.6168 2.12953 16.7372 3.25871C17.5004 3.27425 18.1602 3.31372 18.7236 3.41721C19.4816 3.55644 20.1267 3.82168 20.6517 4.34661C21.2536 4.94853 21.5125 5.7064 21.6335 6.60651C21.75 7.47348 21.75 8.5758 21.75 9.94339V16.0531C21.75 17.4207 21.75 18.523 21.6335 19.39C21.5125 20.2901 21.2536 21.048 20.6517 21.6499C20.0497 22.2518 19.2919 22.5107 18.3918 22.6317C17.5248 22.7483 16.4225 22.7483 15.0549 22.7483H8.94513C7.57754 22.7483 6.47522 22.7483 5.60825 22.6317C4.70814 22.5107 3.95027 22.2518 3.34835 21.6499C2.74643 21.048 2.48754 20.2901 2.36652 19.39C2.24996 18.523 2.24998 17.4207 2.25 16.0531V9.94339C2.24998 8.5758 2.24996 7.47348 2.36652 6.60651C2.48754 5.7064 2.74643 4.94853 3.34835 4.34661C3.87328 3.82168 4.51835 3.55644 5.27635 3.41721C5.83977 3.31372 6.49963 3.27425 7.26279 3.25871ZM7.26476 4.75913C6.54668 4.77447 5.99332 4.81061 5.54735 4.89253C4.98054 4.99664 4.65246 5.16382 4.40901 5.40727C4.13225 5.68403 3.9518 6.07261 3.85315 6.80638C3.75159 7.56173 3.75 8.56285 3.75 9.99826V15.9983C3.75 17.4337 3.75159 18.4348 3.85315 19.1901C3.9518 19.9239 4.13225 20.3125 4.40901 20.5893C4.68577 20.866 5.07435 21.0465 5.80812 21.1451C6.56347 21.2467 7.56458 21.2483 9 21.2483H15C16.4354 21.2483 17.4365 21.2467 18.1919 21.1451C18.9257 21.0465 19.3142 20.866 19.591 20.5893C19.8678 20.3125 20.0482 19.9239 20.1469 19.1901C20.2484 18.4348 20.25 17.4337 20.25 15.9983V9.99826C20.25 8.56285 20.2484 7.56173 20.1469 6.80638C20.0482 6.07261 19.8678 5.68403 19.591 5.40727C19.3475 5.16382 19.0195 4.99664 18.4527 4.89253C18.0067 4.81061 17.4533 4.77447 16.7352 4.75913C16.6067 5.87972 15.655 6.75 14.5 6.75H9.5C8.345 6.75 7.39326 5.87972 7.26476 4.75913ZM9.5 2.75C9.08579 2.75 8.75 3.08579 8.75 3.5V4.5C8.75 4.91421 9.08579 5.25 9.5 5.25H14.5C14.9142 5.25 15.25 4.91421 15.25 4.5V3.5C15.25 3.08579 14.9142 2.75 14.5 2.75H9.5ZM8.96967 11.5303C8.67678 11.2375 8.67678 10.7626 8.96967 10.4697C9.26256 10.1768 9.73744 10.1768 10.0303 10.4697L12 12.4394L13.9697 10.4697C14.2626 10.1768 14.7374 10.1768 15.0303 10.4697C15.3232 10.7626 15.3232 11.2375 15.0303 11.5304L13.0607 13.5L15.0303 15.4697C15.3232 15.7626 15.3232 16.2374 15.0303 16.5303C14.7374 16.8232 14.2625 16.8232 13.9697 16.5303L12 14.5607L10.0304 16.5303C9.73746 16.8232 9.26259 16.8232 8.96969 16.5304C8.6768 16.2375 8.6768 15.7626 8.96969 15.4697L10.9394 13.5L8.96967 11.5303Z" ></path>
                            </svg>
                            :
                            <svg className='del' viewBox="-6.5 -7 37 37" fill="none" >
                                <path d="M12 1V5" stroke="#870000ff" strokeWidth="1.7" strokeLinecap="round"></path>
                                <path d="M19.4246 18.9246L16.5961 16.0962" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round"></path>
                                <path d="M22.5 11.5L18.5 11.5" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round"></path>
                                <path d="M12 18V22" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round"></path>
                                <path d="M7.40381 6.90381L4.57538 4.07538" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round"></path>
                                <path d="M5.5 11.5L1.5 11.5" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round"></path>
                                <path d="M7.40381 16.0962L4.57538 18.9246" stroke="#1C1C1C" strokeWidth="1.7" strokeLinecap="round"></path>
                            </svg>
                        )
                    }
                </div>
                <div className="cmtview">{cmt.msg}</div>
            </div>
        </div>)
}