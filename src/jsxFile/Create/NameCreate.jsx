import '../../cssFile/Create-css/NameCreate.css'
import { useRef, useState } from 'react';

import AlertMsg from '../Help/AlertMsg'
import QuickMsg from '../Help/Quickmsg'


export default function namecreate({ value, setValue, wait, setWait, submitname }) {


    const checkingTimeout = useRef(null);

    function setNames(e) {
        const { name } = e.target;
        let { value } = e.target;

        if (name === "username") {
            setWait((pre) => ({ ...pre, stop: true }))
            value = value.toLowerCase();
            value = value.replace(/\s+/g, "_");
            if (!/^(?![0-9.])(?!.*[._]{2})[A-Z a-z0-9._]{0,26}$/.test(value)) return;
        }


        if (name === "name") {
            value = value
                .replace(/[^A-Za-z ]/g, "")
                .replace(/\s{2,}/g, " ")
                .replace(/^ /, "");
        }


        if (value.length > 26) value = value.slice(0, 26);

        setValue((prev) => ({ ...prev, [name]: value }));

        clearTimeout(checkingTimeout.current);
        if (name == 'username') {
            if (value.length != 0) {
                setWait((pre) => ({ ...pre, alert: "", error: false }))
                checkingTimeout.current = setTimeout(() => {
                    userExist(value);
                }, 1000);
            } else {
                setWait((pre) => ({ ...pre, alert: "Oops! Username missing", error: true }))
            }
        }
    }

    async function userExist(value) {
        try {
            setWait((pre) => ({ ...pre, quick: '', alert: "", error: false }))
            if (value.length <= 4) {
                setWait(pre => ({ ...pre, alert: "Almost there, add a few more letters", error: true }));
                return;
            }
            const response = await fetch("/https://tasklyserver-0ux1.onrender.com/api/isuserexist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: value }),
            });

            const data = await response.json();
            if (data.error) {
                setWait(pre => ({ ...pre, quick: '', qerror: false }));
                setTimeout(() => {
                    setWait(pre => ({ ...pre, quick: data.message, qerror: true }));
                }, 0);
                return;
            }
            if (!data.exists) {
                setWait((pre) => ({ ...pre, stop: false, alert: "This username is free", error: false }))
            } else {
                setWait((pre) => ({ ...pre, stop: true, alert: "Username allready exist", error: true }))
            }
        } catch (err) {
            setWait(pre => ({ ...pre, quick: '', qerror: false }));
            setTimeout(() => {
                setWait(pre => ({ ...pre, quick: data.message, qerror: true }));
            }, 0);
        }
    }
    return (
        <div onKeyDown={(e) => { if (e.key === "Enter") submitname(); }} className="namecreate  isFlex">
            <h1>Set your names</h1>
            <div className="onecreate  isFlex">
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    onChange={setNames}
                    value={value.name}
                    placeholder='Eg : anshu'
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div className="onecreate isFlex">
                <label>username</label>
                <input
                    name="username"
                    onChange={setNames}
                    value={value.username}
                    placeholder='Eg : who.is.anshu'
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div className='altdivcreate'>
                {wait.alert != '' && <AlertMsg msg={wait.alert} error={wait.error} />}
            </div>
            <QuickMsg msg={wait.quick} error={wait.qerror} />
        </div>
    )
}