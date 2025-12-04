import '../../cssFile/ViewChallenges-css/MainViewChallenges.css'
export default function allImgs({ imgs }) {
    return (
        <div className="allimgs">
            {imgs.map((one, ind) =>
                <img key={ind} className={`itm${ind}`} src={one.path} />
            )}
        </div>
    )
}