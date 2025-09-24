import '../../cssFile/Help-css/Verifyer.css'
import { useState } from 'react'
import Button from './Button'
export default function verifyer({ fn, msg, setRemove }) {
    const [value, setvalue] = useState({ error: '', input: "", act: `delete-${msg?.toLowerCase().split(" ")[0]}` })

    function inputChg(e) {
        const val = e.target.value.toLowerCase().replace(" ","-");
        if (val.length > value.act.length) return;
        setvalue((pre) => ({ ...pre, input: val }))
    }

    function afterDelete() {
        if (value.input == value.act)
            fn();
        setRemove(false);
    }
    return (<div className='Verifyermsg isFlex'>
        <div className='mainverifyer isFlex'>
            <p>Type "<span>{value.act}</span>" for delete the task</p>
            <input
                onChange={inputChg}
                value={value.input}
                type="text"
                autoComplete='false'
            ></input>
            <div className='btndivVerify'>
                {value.act == value.input ?
                    <Button msg="Delete" fn={afterDelete} typ={2} />
                    :
                    <Button msg="Cancle" fn={() => setRemove(false)} typ={1} />
                }

            </div>

        </div>
    </div>)
}