

export default function ({one,removeCandidate }) {
    return (
        <div className="frndimg  ">
            <img className='thisImg isFlex' src={one.pic} />
            <svg onClick={()=>removeCandidate(one.id)} className='ccut' viewBox="0 0 24 24" >
                <circle id="secondary" cx="12" cy="12" r="9" strokeWidth="2"></circle>
                <line x1="15" y1="15" x2="9" y2="9" fill="none" stroke="#ffffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                <line x1="9" y1="15" x2="15" y2="9" fill="none" stroke="#ffffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></line>
                <circle cx="12" cy="12" r="9" fill="none" stroke="#ffffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
            </svg>


        </div>
    )
}