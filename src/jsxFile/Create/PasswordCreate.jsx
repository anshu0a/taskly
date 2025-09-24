import '../../cssFile/Create-css/NameCreate.css'
import AlertMsg from '../Help/AlertMsg'

export default function passwordcreate({ value, setValue, wait, setWait, submitname }) {


    function setPassword(e) {
        const { name, value: val } = e.target;
        setValue((prev) => ({ ...prev, [name]: val }));
        if (value.password.length >= 5 && value.password === value.repassword) {
            setWait(pre => ({ ...pre, quick: '', error: false, alert: '', qerror: false }));
        }

    }


    return (
        <div onKeyDown={(e) => { if (e.key === "Enter") submitname(); }} className="namecreate  isFlex">
            <h1>Set a strong passord ?</h1>
            <form className="onecreate  isFlex">
                <label>Password</label>
                <input
                    type="password"
                    autoCapitalize='false'
                    name="password"
                    onChange={setPassword}
                    value={value.password}
                    placeholder='Eg : secure-password'
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>
            <div className="onecreate isFlex">
                <label>Re-enter password</label>
                <input
                    type="text"
                    name="repassword"
                    onChange={setPassword}
                    value={value.repassword}
                    placeholder='Eg : re-password'
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div className='altdivcreate'>
                {wait.alert != '' && <AlertMsg msg={wait.alert} error={wait.error} />}
            </div>
        </div>
    )
}