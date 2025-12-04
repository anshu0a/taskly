import '../../cssFile/ViewChallenges-css/MainViewChallenges.css'
import dayAgo from '../Help/dayAgo'
export default function ({ my, dare, all }) {
    const getTym = function(dtm){
        const dt = new Date(dtm).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        return dt;
    }
    return (
        <div className='timelineDare'>
            <div className="drboxTime isFlex">
                <p>You're watching an intense <span>{dare.days}</span> day challenge unfold.</p>
                <p>Challenge launched on <span>{getTym(dare.createdAt)}</span>.</p>
                {my && <>
                    <p>You discovered this dare on <span>{getTym(all.addedAt)}</span>.</p>
                    <p>You're on a <span>{all.streek}</span> day consistency streak — keep it going!</p>
                    <p>Your last successful task was completed on <span>{dayAgo(all.lastDone)}</span>.</p>
                </>}


            </div>

        </div>
    )
} 