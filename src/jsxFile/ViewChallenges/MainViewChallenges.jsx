import '../../cssFile/ViewChallenges-css/MainViewChallenges.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import NotFound from '../Help/notFound'
import Back from '../Help/Back'
import VideoBlock from './VideoBlock'
import Collab from './Collab'
import Slider from './Slider'
import AllDares from './AllDares'
import DeleteDare from './DeleteDare'
import Progress from './Progress'
import People from './People'
import Timeline from './Timeline'
import Info from './Info'
import Images from './Images'
import AudioFile from './Audios'

export default function () {
    const [data, setData] = useState({
        msg: "",
        loading: true,
        dare: null,
        allThings: null,
        found: true,
    });

    const [page, setPage] = useState(1)
    const { dareId, type } = useParams();

    useEffect(() => {
        async function getOneDare() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/oneDare/${dareId}/${type}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        credentials: "include",
                    }
                );

                const resData = await response.json();

                if (resData.notLogin) {
                    window.location.href = "/login";
                    return;
                }

                console.log(resData)
                if (!resData.error) {
                    if (type === "personal") {
                        setData({ msg: "", loading: false, dare: resData.dare.dare, allThings: resData.dare });
                    } else {

                        setData({ msg: "", loading: false, dare: resData.dare, allThings: null });
                    }
                } else {
                    setData(pre => ({ ...pre, found: resData.found || true, msg: resData.message, loading: false }));

                }

            } catch (err) {
                setData(pre => ({ ...pre, msg: "Something went wrong", loading: false }));
            }
        }

        setData(pre => ({ ...pre, loading: true }));
        getOneDare();
    }, [dareId, type]);






    return (<>{
        data.loading ?
            <div className='loadingonedare isFlex'>
                <ContentLoader className='cctt' viewBox="0 0 400 260" >
                    <circle cx="30" cy="230" r="30" />
                    <rect x="75" y="220" rx="4" ry="4" width="100" height="13" />
                    <rect x="75" y="200" rx="4" ry="4" width="50" height="8" />
                    <rect x="0" y="180" rx="5" ry="5" width="400" height="10" />
                    <rect x="0" y="0" rx="5" ry="5" width="400" height="170" />
                </ContentLoader>
            </div>
            : !data.found ?
                <>
                    <div className='toponedare isFlex'>
                        <div className='hometop isFlex'>
                            <Back setIsAdd={() => window.history.back()} />
                            <p style={{ textAlign: 'end' }}>
                                {data.dare.title}
                                <br />
                                <span>{data.dare.purpose}</span>
                            </p>
                        </div>
                    </div>

                    <div className='mainBody mainviewdare isFlex'>
                        <VideoBlock streek={type === "public" ? false : data.allThings?.streek} dare={data.dare} />
                        {data.dare.admin && (<Collab dareId={data.dare._id} user={data.dare.admin} type={type !== 'personal'} collabs={data.dare.collab || []} />)}

                        <p className='auradare'>  You are the <span>{data.allThings?.by === 'g' ? "Challenger" : data.allThings?.by === 'm' ? "Creator" : data.allThings?.by === 'c' ? "Collaborator" : "Viewer"}</span> of this dare </p>
                        {data.dare.voices[0] && <AudioFile voice={data.dare.voices[0]} />}
                        <Slider page={page} my={type === 'personal'} setPage={setPage} />
                        {page === 0 && <Info dare={data.dare} />}
                        {page === 1 && (<AllDares dareId={data.dare._id} type={type === 'personal'} setData={setData} all={type === 'personal' ? data.allThings?.allDares : data.dare.allDares} />)}
                        {page === 2 && (<div className="descit isFlex">  <p className="maindsc">{data.dare.desc}</p>   </div>)}
                        {page === 3 && (<Timeline my={type === 'personal'} dare={data.dare} all={data.allThings} />)}
                        {page === 4 && <People dare={data.dare} />}
                        <Images imgs={data.dare.images || []} />
                        {type === 'personal' && data.allThings && (<Progress allThings={data.allThings} />)}
                        {type === 'personal' && data.allThings && (<DeleteDare title={data.dare.title} dareId={data.dare._id} type={data.allThings.by} />)}
                    </div>
                </>
                :
                <NotFound />

    } </>);
}






