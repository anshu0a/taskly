import '../../../cssFile/Home-css/AddingOneTask.css'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '../../Help/Button'
import Quick from '../../Help/NewQuick'

export default function allaDareTask({ value, setvalue }) {
    const [dare, setDare] = useState({ msg: "", addDare: "" });

    const setMyDare = function (e) {
        let { name, value: val } = e.target;
        val = val.slice(0, 20).replace(" ", "_");
        setDare((pre) => ({ ...pre, [name]: val }));
    }
    const addOneTask = function () {
        if (dare.addDare == "") return;
        if (value.allDares.includes(dare.addDare)) {
            setDare(pre => ({ ...pre, msg: `${pre.addDare} allready exist`, addDare: "" }));
            return;
        }
        setvalue(pre => ({ ...pre, allDares: [...pre.allDares, dare.addDare] }));
        setDare(pre => ({ ...pre, addDare: "" }));
    }
    const cutdare = function (which) {
        setvalue(pre => ({ ...pre, allDares: pre.allDares.filter(one => one !== which) }));
    }

    return (
        <div className="maininps isFlex">
            <div className='boxOfDare isFlex'>
                {
                    value.allDares.map((one, ind) => (
                        <div key={ind} className="onedare isFlex">
                            <p className='isp'>{one}</p>
                            <svg onClick={() => cutdare(one)} className='cutit' viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M10.4269 2.42136C11.4003 1.85938 12.5996 1.85938 13.573 2.42136L19.5087 5.84836C20.4821 6.41034 21.0817 7.44892 21.0817 8.57288V15.4269C21.0817 16.5508 20.4821 17.5894 19.5087 18.1514L13.573 21.5784C12.5996 22.1404 11.4003 22.1404 10.4269 21.5784L4.49122 18.1514C3.51784 17.5894 2.91821 16.5508 2.91821 15.4269V8.57288C2.91821 7.44892 3.51784 6.41034 4.49122 5.84836L10.4269 2.42136ZM9.34833 9.34832C9.64123 9.05543 10.1161 9.05543 10.409 9.34832L11.9999 10.9393L13.5909 9.34833C13.8838 9.05544 14.3587 9.05544 14.6516 9.34833C14.9444 9.64123 14.9444 10.1161 14.6516 10.409L13.0606 11.9999L14.6516 13.591C14.9445 13.8839 14.9445 14.3587 14.6516 14.6516C14.3587 14.9445 13.8839 14.9445 13.591 14.6516L11.9999 13.0606L10.4089 14.6516C10.116 14.9445 9.64115 14.9445 9.34825 14.6516C9.05536 14.3587 9.05536 13.8839 9.34825 13.591L10.9393 11.9999L9.34833 10.409C9.05544 10.1161 9.05544 9.64122 9.34833 9.34832Z" />
                            </svg>
                        </div>
                    ))

                }
                {
                    dare.addDare != "" &&
                    <div className="onedare isFlex">
                        <p className='isp'>{dare.addDare}</p>
                    </div>
                }

            </div>
            
            {value.allDares.length < 8 &&
                <>
                    <TextField
                        onKeyDown={(e) => { if (e.key === "Enter") addOneTask() }}
                        autoComplete='off'
                        name='addDare'
                        value={dare.addDare}
                        onChange={setMyDare}
                        className="darename"
                        label="Dare name"
                        variant="standard"
                        helperText={value.errorTitle || "Add your Dare name."}
                        error={value.errorTitle != ''}
                        sx={{
                            m: 1,
                            width: "40ch",
                            "& .MuiInputLabel-root": { fontSize: "1rem" },
                            "& .MuiFormHelperText-root": { fontSize: "0.7rem" },
                            "& .MuiInputBase-input": { fontSize: ".9rem" },
                        }}
                    />
                    {dare.addDare != "" && <Button fn={addOneTask} msg="Add Dare" />}
                </>
            }
            <Quick msg={dare.msg} setMsg={setDare} />
        </div>
    )
}