import '../../cssFile/ViewTaskId-css/ViewTask.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

import Back from '../Home/Back'
import NotFound from '../Help/notFound'
import TopPrt from './TopPrt'
import SecondPrt from './SecondPrt'
import Functions from './Functions'
import Comments from './comments'




export default function viewtask() {
    const [act, setAct] = useState({ userId: '', voice: { is: false, audio: null }, extra: null, fade: true, found: true, task: null, imgError: false, bgIndex: 0 })
    const { taskId } = useParams();
    useEffect(() => {
        async function gettask() {
            try {
                const search = localStorage.getItem("type").endsWith('u') ? "public" : "presonal"
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/getOneTask/${taskId}/${search}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    credentials: "include",
                });

                const data = await response.json();
                const voice = data.task.voices[0];

                if (voice?.data?.data) {
                    const byteArray = new Uint8Array(voice.data.data);
                    const blob = new Blob([byteArray], { type: voice.contentType });
                    setAct((pre) => ({ ...pre, voice: { is: false, audio: URL.createObjectURL(blob) } }))
                }
                if (data.notLogin) {
                    window.location.href = "/login";
                }
                if (!data.error) {
                    setAct((pre) => ({ ...pre, userId: data.user, found: true, task: data.task, extra: data.extra }))
                } else {

                }
            } catch (err) {
                console.log("Error from server:", err);
            }
        }
        gettask();
    }, [taskId])

    useEffect(() => {
        if (!act.task) return;
        if (act.task.images.length <= 1) return;

        const interval = setInterval(() => {
            setAct((prev) => ({ ...prev, fade: false }));

            setTimeout(() => {
                setAct((prev) => ({
                    ...prev,
                    bgIndex: (prev.bgIndex + 1) % act.task.images.length,
                    fade: true,
                }));
            }, 100);
        }, 5000);

        return () => clearInterval(interval);
    }, [act.task]);


    return (<>     {
        act.found ?
            <>
                <div className='top'>
                    <div className='hometop'>
                        <Back setIsAdd={() => window.history.back()} />
                        <p style={{ textAlign: 'end' }}>
                            {act.task?.title}
                            <br />
                            <span>{act.task?.purpose}</span>
                        </p>
                    </div>
                </div>
                <div className='mainBody'>
                    {
                        act.task &&
                        <div className='viewTask isFlex'>
                            <TopPrt act={act} setAct={setAct} />
                            <SecondPrt act={act} setAct={setAct} />
                            <Comments act={act} setAct={setAct} />
                            {(act.task.type == 'personal' || (act.task.type == 'public' && (act.userId == act.task.owner._id || (act.userId != act.task.owner._id && act.extra?.addedAt.slice(0, 20) != act.task?.createdAt.slice(0, 20))))) &&
                                <Functions title={act.task.title} user={act.userId} taskId={act.extra._id} setAct={setAct} isDone={act.extra.isDone} />
                            }
                        </div>
                    }
                </div>
            </>
            :
            <NotFound />
    } </>);
}

