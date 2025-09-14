import '../../cssFile/Home-css/AddingONeTask.css'

import TitleInputs from './Inputs/TitleInputs'
import Timelineinputs from './Inputs/TimelineInput'
import PriorityLevel from './Inputs/PriorityLevel'
import DescriptionInput from './Inputs/DescriptionInput'
import VoiceInput from './Inputs/VoiceInput'
import ImageInputs from './Inputs/Imageinputs'


export default function inputtem({ msg, typ }) {
    return (
        <div className="titleInputs isFlex">
            <h1 className={typ == 1 ? "" : typ == 2 ? "secH" : typ == 3 ? "thiH" : typ == 4 ? "forH": typ == 5 ? "fivH" :typ == 6 ? "sixH": ""}>{msg}</h1>

            {typ == 1 ?
                <TitleInputs />
                : typ == 2 ?
                    <Timelineinputs />
                    : typ == 3 ?
                        <PriorityLevel />
                        : typ == 4 ?
                            <DescriptionInput />
                            : typ == 5 ?
                            <VoiceInput />
                            : typ == 6 ?
                            <ImageInputs />
                            :
                            <></>
            }
        </div>
    )
}