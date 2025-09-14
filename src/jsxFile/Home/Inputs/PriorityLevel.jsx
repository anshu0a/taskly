import '../../../cssFile/Home-css/AddingONeTask.css'
import Slider from '@mui/material/Slider';

export default function levelInputs() {
    return (
        <div className="maininps  rowinmaininp isFlex">
            <Slider
                className='levelinp'
                size="small"
                defaultValue={75}
                aria-label="Small"
                valueLabelDisplay="auto"
            />
            <div className='radioinpdiv'>
                <p className='miniTitle'>Task Type </p>
                <input id="pri" name="access" defaultChecked value="private" type="radio"></input>
                <label htmlFor='pri'>Presonal</label>
                <input id="pub" name="access"  value="public" type="radio"></input>
                <label htmlFor='pub'>Public</label>

            </div>
        </div>
    )
}