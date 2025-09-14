import "../../cssFile/Home-css/NoTask.css"
import AddTask from './AddTask'

export default function notask() {
    return (<div className="notask isFlex">
        <img className="notaskImg" src="/Svg/Tasks/noTask.svg" />
        <h2>No Tasks</h2>
        <AddTask msg="Add Your First Tasks" />
    </div>);
}