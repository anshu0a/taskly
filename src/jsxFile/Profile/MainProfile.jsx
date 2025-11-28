import '../../cssFile/Profile-css/MainProfile.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';



import Icon from './Icon'
import ProfileCard from './CardProfile'
import Quick from '../Help/NewQuick'
import AddLinks from './AddLinks'
import PreLoader from './PreLoader'
import UserNotFound from './NotFoundUser '

export default function ({ }) {
    const [userData, setUserData] = useState({ sts: "loading", msg: "", person: {} })
    const { person } = useParams();
    const [link, setLink] = useState({ page: 0, links: [] })

    useEffect(() => {
        async function getDetails() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/getProfileInfo/${person}`, {
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
                    setUserData((pre) => ({ ...pre, sts: "found", person: data.person }));
                    console.log(data.person)
                    setLink((pre) => ({ ...pre, links: data.person.links }))
                } else {
                    setUserData((pre) => ({ ...pre, sts: "not", msg: data.message }))
                }

            } catch (er) {
                console.log("error in mainprofile : ", er);
                setUserData((pre) => ({ ...pre, sts: "retry", msg: "Something went wrong." }));
            }
        }
        getDetails();

    }, [])


    return (<div className='mainprofile isFlex'>
        {
            userData.sts == "found" ?
                <>
                    <div className='topprofileis isFlex'>
                        <p title="Copy Username" className='nameInProfile'>{userData.person.username}</p>
                        <div className='iconBox isFlex'>
                            <Icon msg="Edit" />
                            <Icon msg="Share" />
                        </div>
                    </div>
                    <div className='remainProfile isFlex'>
                        <ProfileCard setLink={setLink} link={link} person={userData.person} />
                    </div>
                </>
                : userData.sts == "loading" ?
                   <PreLoader /> 
                    :
                    <UserNotFound msg=" User Not Found"/>
        }
        <Quick msg={userData.msg} setMsg={setUserData} />
        {link.page != 0 && <AddLinks setLink={setLink} link={link} />}
    </div>

    );

}