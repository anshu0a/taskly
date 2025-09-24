import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../../cssFile/Help-css/notFound.css'
export default function notfoumd() {
    return (<div className='nofound404 isFlex'>
        <div className="inami isFlex">
            {/* <DotLottieReact
                src="https://lottie.host/7adbeef2-16a0-4b57-b827-c2d459c33bb9/o6wb32rKi9.lottie"
                loop
                autoplay
            /> */}
            <img className='dogimg' src="/Svg/notFound.svg"></img>
            <p>Page Not Found</p>
            <div className=" btnloc404 isFlex ">
                <div onClick={()=>window.history.back()}>&nbsp;Back&nbsp; </div>
                <div  onClick={()=>window.location.replace('/taskly/private')} >Home</div>
            </div>
        </div>
    </div>)
}