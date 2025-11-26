import '../../cssFile/Challenges-css/MainChallenges.css'
import "../../cssFile/Home-css/OutHome.css"
import AddChallenges from '../Home/AddTask'
import AllFeed from './AllFeed'

export default function maintimer({ myFeed }) {
    return (<>
        <>
            <div className='top'>
                <div className="hometop">
                    <p className="topinfo">Challengify<br /><span>Where Every Task Becomes a Triumph!</span></p>
                    <AddChallenges msg="Create" type="chg" />
                </div>
            </div>
            <div className='mainBody'>
                <div className="outhome isFlex">
                    <div className="allopt isFlex">
                        <div onClick={() => window.location.replace("/taskly/challenges/private")} className={myFeed ? "opt12  inopt" : "opt12"}>Private</div>
                        <div onClick={() => window.location.replace("/taskly/challenges/global")} className={!myFeed ? "opt12  inopt" : "opt12"}>Global</div>
                    </div>
                    <AllFeed />
                    {/* {myFeed ?
                        <MyTask data={data} user={user} setData={setData} isloading={isLoading.is} />
                        :
                        <FrndTask data={data} user={user} setData={setData} isloading={isLoading.is} />
                    } */}
                </div>
            </div>
        </>
    </>)
}