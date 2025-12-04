import "../../cssFile/Home-css/NoTask.css"
import AddTask from './AddTask'

export default function notask({ type, msg, pic }) {

    return (<div className="notask isFlex">
        <img className="notaskImg" src={pic == 1 ? "/Svg/noTask.svg" : pic == 2 ? "/Svg/noTask2.svg" : pic == 3 ? "/Svg/noTask3.svg" : "/Svg/noTask4.svg"} />
        <h2>{type == 'task' ? "No Task" : "No Challenges"}</h2>
        <AddTask msg={msg} type={type} />
    </div>);
}