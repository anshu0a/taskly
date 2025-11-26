import '../../cssFile/Switch-css/OverSwitch.css'
import { useEffect, useState } from 'react';
import OutIndex from './OutIndex'
import { jwtDecode } from 'jwt-decode';
import Index from './Index';
import Junction from "../../Main/Junction"
import Loading from './Loading'




export default function overSwitch() {
    const [myData, setMyData] = useState({ loading: false, msg: "", })


    useEffect(() => {

        if (sessionStorage.getItem("status") != "allreadyIn") {
            sessionStorage.setItem("status", "allreadyIn");
            setMyData((pre) => ({ ...pre, loading: true }));
            setTimeout(() => {
                setMyData(pre => ({ ...pre, loading: false }));
            }, 3000);


        }

        setTimeout(() => {
            setMyData(pre => ({ ...pre, loading: false }));
        }, 3000);

    }, [])

    return (
        <>
            {myData.loading ?
                <Loading />
                :
                <div className="overSwitch">
                    <div className='switch'>
                        <div className="hidenav">
                            <img src="/Svg/textLogo.svg"></img>
                        </div>
                        <OutIndex />
                        <Index name={"@" + jwtDecode(localStorage.getItem("token")).username} />
                    </div>
                    <div className='actContent'>
                        {/* <div className='top'>top</div>
                <div className='mainBody'>
                    <div>hello</div>
                </div> */}
                        <Junction />
                    </div>
                </div>
            }
        </>
    )
}