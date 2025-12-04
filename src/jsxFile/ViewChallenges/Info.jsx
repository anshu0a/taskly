import '../../cssFile/ViewChallenges-css/MainViewChallenges.css'
export default function ({ dare }) {
    return (
        <div className="infoDare isFelx">
            <div className="ininfo isFlex">
                <p><span>Type -</span>  {dare.type}</p>
                <p><span>Title -</span>  {dare.title}</p>
                <p><span>Purpose -</span>  {dare.purpose}</p>
                <p><span>Priority -</span>  {dare.priority} %</p>
            </div>
        </div>
    )
}