import '../../cssFile/Profile-css/CardProfile.css'
import { useState } from 'react';

import Social from './Social'
import DownPart from './DownPart'
import Streek from './Streek'
import formatedINk from '../Help/returnINm'
export default function ({ person, setLink, link }) {
    const [random, setRandom] = useState({ forcover: Math.floor(Math.random() * 8), forpic: Math.floor(Math.random() * 27) });


    return (<>
        <div className='wholeProfileCard isFlex'>
            <div className='outBackPic isFlex'>
                <img className='yeHAiCover' src={person.cover}></img>
                <div className='forMainPic isFlex'>
                    <div className='profileDiv isFlex'>
                        <img className='actImg' alt="profile pic" referrerPolicy="no-referrer" src={person.pic} />
                    </div>
                    <p className='ppmm mainName'>{person.name}</p>
                    <p className='ppmm mainProfession'>{person.profession}</p>
                </div>
                {(link.links.length !== 0 || person.id === person.iAm) &&

                    <div className="socialDiv isFlex">
                        {link.links?.slice(0, 4).map((one, i) => ( 
                            <Social data={one} key={i} />
                        ))}
                        {person.id === person.iAm && <Social setLink={setLink} data={{ type: "add" }} />}
                    </div>
                }
                <Streek typ={true} streek={formatedINk(person.merit )} />
            </div>
            <p className='bioInProfile'>{person.bio}</p>
            <DownPart person={person}/>
        </div>
    </>)
}