import '../../cssFile/Profile-css/CardProfile.css'
import { useState } from 'react';
import OutBox from './Box'
import Social from './Social'

export default function ({person}) {
    const [random, setRandom] = useState({ forcover: Math.floor(Math.random() * 8), forpic: Math.floor(Math.random() * 27) });

    return (<>
        <div className='wholeProfileCard isFlex'>
            <div className='outBackPic isFlex'>
                <img className='yeHAiCover' src={person.cover}></img>
                <div className='forMainPic isFlex'>
                    <div className='profileDiv isFlex'>
                        <img className='actImg' src={person.pic}></img>
                    </div>
                    <p className='ppmm mainName'>{person.name}</p>
                    <p className='ppmm mainProfession'>{person.profession}</p>
                </div>
                <div className="socialDiv isFlex">
                    {/* gm, te, fa, gi, li, sn, tw, wh, yo, in */}
                    <Social msg="gi" />
                    <Social msg="li" />
                    <Social msg="fa" />
                    <Social msg="te" />
                    <Social msg="add" />
                </div>
                <div className="streekDay isFlex">
                    <img className='firestreekis' src="/Svg/Accounts/fire.svg" />
                    <p className=' cntStreek ppmm'>{person.streek}</p>
                </div>
            </div>
            <p className='bioInProfile'>{person.bio}</p>
            <div className='downPart isFlex'>
                <OutBox msg="Tasks" cnt={person.tasks} />
                <OutBox msg="Dares" cnt={person.dares} />
                <OutBox msg="Friends" cnt={person.friends} />
            </div>
        </div>
    </>)
}