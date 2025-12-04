import '../../cssFile/ViewChallenges-css/VideoBlock.css'
import { useState, useEffect } from 'react'
import Streek from '../Profile/Streek'

export default function ({ dare, streek }) {
    return (
        dare?.admin?.photo && 
        <div className="videoBlock isFlex">
            
            <video className='chaloVid' loop onLoadedMetadata={(e) => (e.target.playbackRate = 0.75)} autoPlay muted playsInline src={dare.video} />
            <div onClick={()=>window.location.href=`/taskly/profile/${dare.admin.username}`} className="crdper isFlex">
                <img className='maihu' src={dare.admin.photo} />
                <p className='ppmm'>{dare.admin.username}</p>
                <p className=' meranm ppmm'>{dare.admin.name}</p>
            </div>
            {streek !== false && <Streek streek={streek} />}
        </div>
    )
}