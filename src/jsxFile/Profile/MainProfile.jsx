import '../../cssFile/Profile-css/MainProfile.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader'


import Icon from './Icon'
import ProfileCard from './CardProfile'
import Quick from '../Help/NewQuick'
import Buttom from '../Help/Button'

export default function ({ }) {
    const [userData, setUserData] = useState({ sts: "loading", msg: "", person: {} })
    const { person } = useParams();

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

                    setUserData((pre) => ({ ...pre, sts: "found", person: data.person }))
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
                        <ProfileCard person={userData.person} />
                    </div>
                </>
                : userData.sts == "loading" ?
                    <div className='loadingAtProfile isFlex'>
                        <ContentLoader
                            className='ContentLoader'
                            width={600}
                            height={300}
                            viewBox="0 0 600 360"
                            backgroundColor="#fcecffff"
                            foregroundColor="#e9c4ffff"
                        >
                            <rect x="100" y="290" rx="3" ry="3" width="400" height="10" />
                            <rect x="25" y="310" rx="3" ry="3" width="550" height="10" />
                            <rect x="50" y="330" rx="3" ry="3" width="500" height="10" />
                            <circle cx="300" cy="160" r="100" />
                        </ContentLoader>
                        <ContentLoader
                            className='ContentLoader'
                            width={600}
                            height={200}
                            viewBox="0 0 600 360"
                            backgroundColor="#fcecffff"
                            foregroundColor="#e9c4ffff"
                        >
                            <rect x="145" y="5" rx="3" ry="3" width="90" height="80" />
                            <rect x="255" y="5" rx="3" ry="3" width="90" height="80" />
                            <rect x="365" y="5" rx="3" ry="3" width="90" height="80" />

                        </ContentLoader>
                    </div>

                    :
                    <div className='notFoundUser isFlex'>
                        <img className='notFoundImg' src="/Svg/userNotFound.svg" />
                        <p>User Not Found</p>
                        <Buttom typ="9" fn={() => window.location.replace('/taskly/global')} msg="Back to Home" />
                    </div>
        }
        <Quick msg={userData.msg} setMsg={setUserData} />
    </div>

    );

}