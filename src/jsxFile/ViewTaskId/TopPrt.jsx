import '../../cssFile/ViewTaskId-css/TopPrt.css'
import RandomPic from '../Help/RandomPic';
import DayAgo from '../Help/dayAgo'

export default function topPrt({act, setAct }) {
    return (<>
        
        <div className='uppderdivView isFlex'>
                <img className={`thisImgView ${act.fade ? "" : "hidefadeview"}`} src={act.task?.images[act.bgIndex].path}></img>
                <div className='userview isFlex'>
                    <div className='oneprtview'>
                        {!act.imgError ?
                            <img
                                className="thisispic"
                                src={act.task?.owner?.photo || "jnj"}
                                onError={() => setAct((pre) => ({ ...pre, imgError: true }))}
                            />
                            :
                            <RandomPic width={50} />

                        }
                        <div className='namedivview isFlex'>
                            <p className='usernm' >{act.task.owner.username}</p>
                            <p className='nm'>{act.task.owner.name}</p>
                        </div>
                    </div>
                    <div className='twoprtview isFlex'>
                        <p>{act.task.title}</p>
                        <p>{act.task.purpose}</p>
                    </div>
                    <p className='tymcreatedview'>{DayAgo(act.task.createdAt)}</p>
                </div>
            </div>
    </>)
}