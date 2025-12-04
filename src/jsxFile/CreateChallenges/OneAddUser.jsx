

export default function ({ one, addCandidate }) {
    return (
        <div className="oneZone isFlex">
            <div className="prt1 isFlex">
                <img onClick={() => window.location.href = `/taskly/profile/${one.username}`} className='frdPic' src={one.pic} />
                <div className="nArea isFlex">
                    <p className="usr ppmm">{one.username}</p>
                    <p className="nm ppmm">{one.name}</p>
                </div>
            </div>
            <svg onClick={() => addCandidate(one.id)} className='prt2' viewBox="0 0 24 24">
                <circle id="secondary" cx="12" cy="12" r="9" strokeWidth="2"></circle>
                <polyline id="primary" points="8 12 11 15 16 10" fill="none" stroke=" #5d5d5dff" strokeLinecap=" round" strokeLinejoin="round" strokeWidth="2"></polyline>
                <circle id="primary-2" data-name="primary" cx="12" cy="12" r="9" fill="none" stroke=" #747474ff" strokeLinecap=" round" strokeLinejoin="round" strokeWidth="2"></circle>
            </svg>
        </div>
    )
}