import '../../../cssFile/Home-css/AddingOneTask.css'
import Slider from '@mui/material/Slider';

export default function levelInputs({ value, setvalue, notTask }) {
    function setPriority(e) {
        const { name, value: val } = e.target;
        setvalue((pre) => ({ ...pre, [name]: val }))
    }
    return (
        <div className="maininps  rowinmaininp isFlex">
            <Slider
                name='priority'
                onChange={setPriority}
                className='levelinp'
                size="small"
                value={value.priority}
                aria-label="Small"
                valueLabelDisplay="auto"
            />
            <div className='radioinpdiv'>
                <p className='miniTitle'>{notTask ? "Dare Type" : "Task Type"} </p>
                <input onChange={setPriority} id="pri" name="type" defaultChecked value="personal" type="radio"></input>
                <label htmlFor='pri'>Presonal</label>
                <input onChange={setPriority} id="pub" name="type" value="public" type="radio"></input>
                <label htmlFor='pub'>Public</label>

            </div>
        </div>
    )
}