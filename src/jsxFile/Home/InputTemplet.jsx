import '../../cssFile/Home-css/AddingOneTask.css'

import TitleInputs from './Inputs/TitleInputs'
import Timelineinputs from './Inputs/TimelineInput'
import PriorityLevel from './Inputs/PriorityLevel'
import DescriptionInput from './Inputs/DescriptionInput'
import VoiceInput from './Inputs/VoiceInput'
import ImageInputs from './Inputs/Imageinputs'


export default function inputtem({ msg, typ,value, setvalue }) {
    return (
        <div className="titleInputs isFlex">
            <h1 className={typ == 1 ? "" : typ == 2 ? "secH" : typ == 3 ? "thiH" : typ == 4 ? "forH": typ == 5 ? "fivH" :typ == 6 ? "sixH": ""}>{msg}</h1>

            {typ == 1 ?
                <TitleInputs value={value} setvalue={setvalue} />
                : typ == 2 ?
                    <Timelineinputs value={value} setvalue={setvalue} />
                    : typ == 3 ?
                        <PriorityLevel value={value} setvalue={setvalue} />
                        : typ == 4 ?
                            <DescriptionInput value={value} setvalue={setvalue} />
                            : typ == 5 ?
                            <VoiceInput value={value} setvalue={setvalue} />
                            : typ == 6 ?
                            <ImageInputs value={value} setvalue={setvalue} />
                            :
                            <></>
            }
        </div>
    )
}