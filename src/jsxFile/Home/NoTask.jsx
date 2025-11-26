import "../../cssFile/Home-css/NoTask.css"
import AddTask from './AddTask'

export default function notask({type , msg}) {
    
    return (<div className="notask isFlex">
        <img className="notaskImg" src={type == 'task' ? "/Svg/noTask.svg" : "/Svg/noTask2.svg"} />
        <h2>{type == 'task' ? "No Task": "No Challenges"}</h2>
        <AddTask msg={msg} type={type} />
    </div>);
}