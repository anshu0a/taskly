import '../../cssFile/Home-css/AddingOneTask.css'
import { useState } from 'react'

import TitleInputs from './Inputs/TitleInputs'
import Timelineinputs from './Inputs/TimelineInput'
import PriorityLevel from './Inputs/PriorityLevel'
import DescriptionInput from './Inputs/DescriptionInput'
import VoiceInput from './Inputs/VoiceInput'
import ImageInputs from './Inputs/Imageinputs'
import AllDareTAsk from './Inputs/AllDareTask'
import AllDareMember from './Inputs/AllDareMember'


export default function inputtem({ msg, typ, value, setvalue, notTask }) {
    const [can, setCan] = useState(true)
    const canAdd = function (can) {
        return can;
    }
    return (
        can &&
        <div className="titleInputs isFlex">
            <h1 className={typ == 1 ? "" : typ == 2 ? "secH" : typ == 3 ? "thiH" : typ == 4 ? "forH" : typ == 5 ? "fivH" : typ == 6 ? "sixH" : typ == 7 ? "sevH" : typ == 8 ? "eigH" : ""}>{msg}</h1>

            {typ == 1 ?
                <TitleInputs notTask={notTask} value={value} setvalue={setvalue} />
                : typ == 2 ?
                    <Timelineinputs value={value} setvalue={setvalue} />
                    : typ == 3 ?
                        <PriorityLevel notTask={notTask} value={value} setvalue={setvalue} />
                        : typ == 4 ?
                            <DescriptionInput notTask={notTask} value={value} setvalue={setvalue} />
                            : typ == 5 ?
                                <VoiceInput value={value} setvalue={setvalue} />
                                : typ == 6 ?
                                    <ImageInputs value={value} setvalue={setvalue} />
                                    : typ == 7 ?
                                        <AllDareTAsk value={value} setvalue={setvalue} />
                                        : typ == 8 ?
                                            <AllDareMember setCan={setCan} value={value} setvalue={setvalue} />
                                            :

                                            <></>
            }
        </div>
    )
}