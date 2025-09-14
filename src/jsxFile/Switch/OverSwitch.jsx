import '../../cssFile/Switch-css/OverSwitch.css'

import OutIndex from './outIndex'
import Index from './Index';
import OutHome from '../Home/OutHome'
import Junction from "../../Main/Junction"


export default function overSwitch() {
    return (
        <div className="overSwitch">
            <div className='switch'>
                <div className="hidenav">
                    <img src="/Svg/textLogo.svg"></img>
                </div>
                <OutIndex />
                <Index />
            </div>
            <div className='actContent'>
                {/* <div className='top'>top</div>
                <div className='mainBody'>
                    <div>hello</div>
                </div> */}
                <Junction />
            </div>
        </div>
    )
}