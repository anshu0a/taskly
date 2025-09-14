import "../../cssFile/Home-css/OutHome.css"

import AddTask from './AddTask'
import NoTask from './NoTask'
import MyTask from './MyTask'
import FrndTask from './FrndTask'
import AddingOneTask from './AddingOneTask'

import { useState } from "react"

export default function outHome() {
    const [isAdd, setIsAdd] = useState(true);
    return (<>
        {isAdd ?
            <AddingOneTask setIsAdd={setIsAdd}/>
            :
            <>
                <div className='top'>
                    <div className="hometop">
                        <p className="topinfo">Taskland<br /><span>Every task is a quest. Complete them all!</span></p>
                        <AddTask setIsAdd={setIsAdd} msg="Add Task" />
                    </div>
                </div>
                <div className='mainBody'>
                    {true ?
                        <div className="outhome isFlex">
                            <div className="allopt isFlex">
                                <div className="opt12 inopt">My Feed</div>
                                <div className="opt12">Friends</div>
                            </div>
                            {false ?
                                <MyTask />
                                :
                                <FrndTask />
                            }
                        </div>
                        :
                        <NoTask />
                    }
                </div>
            </>
        }</>)
}