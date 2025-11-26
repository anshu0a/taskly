import '../../cssFile/Profile-css/Social.css'
export default function ({ msg }) {
    return (<>
        <div className="SocialDiv isFlex">
            <img className='cpmyIcn' src={`/Svg/Accounts/${msg}.svg`} />

        </div>
    </>)
}