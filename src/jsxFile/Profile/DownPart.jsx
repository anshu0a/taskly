import '../../cssFile/Profile-css/CardProfile.css'
import OutBox from './Box'
import { useState,useEffect } from 'react';

export default function ({ person }) {
    const [myDb , setMydb] = useState({sts : person.friends});
    useEffect(()=>{
        setMydb((pre)=>({...pre, sts : person.friends}))
    },[])

    async function frndRequest() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/frndRequest/${person.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
            });

            const data = await response.json();
            if (data.notLogin) {
                window.location.href = "/login";
            }
            if (!data.error) {
               
                console.log(data)
                setMydb((pre)=>({...pre,sts:data.info}))
               
            } else {
               
            }

        } catch (er) {
            console.log("Error in send frnd request : ", er);
        }
    }
    return (
        <div className='downPart isFlex'>
            <OutBox msg="Tasks" cnt={person.tasks} />
            <OutBox msg="Dares" cnt={person.dares} />
            {person.iAm == person.id ?
                <OutBox msg="Friends" cnt={person.friends} />
                :
                <OutBox fn={frndRequest} msg={myDb.sts} other={true} />
            }
        </div>
    )
}