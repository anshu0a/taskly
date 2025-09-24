import '../../cssFile/Create-css/CreateMain.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CreateForm from './CreateForm';
export default function createmain() {
    return (
        <div className="maincreate isFlex">
            <div className="logiccreate">
                <CreateForm />
            </div>
            <div className="anmiCreate isFlex">
                <h1 className="createtitle">Ready to Begin?</h1>
                <DotLottieReact
                    src="https://lottie.host/8088e9af-899d-4230-999e-ffd18f653c49/hToD0WOMS6.lottie"
                    loop
                    width="300"
                    autoplay
                />
                <p className="createmsg">Plan smarter, stay <span>focused</span>,<br/> and get things <span>done.</span></p>
            </div>
        </div> 

    )
}