import '../../cssFile/Profile-css/Social.css'
export default function ({ data, setLink }) {
    
    return (<>
        <div onClick={(() => {data.type != "add" ? window.open(data.goto, "_blank", "noopener,noreferrer") : setLink((pre) => ({ ...pre, page: 1 }))})} className="SocialDiv isFlex">
            <img className='cpmyIcn' src={`/Svg/Accounts/${data.type}.svg`} />

        </div>
    </>)
}