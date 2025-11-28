import Buttom from '../Help/Button'

export default function ({msg}) {
    return (
        <div className='notFoundUser isFlex'>
            <img className='notFoundImg' src="/Svg/userNotFound.svg" />
            <p>{msg}</p>
            <Buttom typ="9" fn={() => window.location.replace('/taskly/global')} msg="Back to Home" />
        </div>
    )
}