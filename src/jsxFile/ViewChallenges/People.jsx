import '../../cssFile/ViewChallenges-css/MainViewChallenges.css'

export default function({dare}){
    return  (
        <div className="peopleDare">
            <p className="headdare">
                Challengers ( {dare.grab.length} )
            </p>
           <p className="ppmm ohpp">The Challenger is the one who accepts the dare and proves it can be done.</p>
            <p className="headdare">
                Viewers ( {dare.views.length} )
            </p>
            <p className="ppmm ohpp">The Viewer watches the journey and fuels the momentum with support</p>
            <p className="headdare">
               Collaborators ( {dare.collab.length} )
            </p>
            <p className="ppmm ohpp">The Collaborator joins forces to strengthen the mission and share success.</p>
        </div>
    )
}