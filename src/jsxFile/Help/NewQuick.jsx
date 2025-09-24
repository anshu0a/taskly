import { useEffect } from 'react';
import '../../cssFile/Help-css/Quickmsg.css';

export default function QuickMsg({ msg, setMsg }) {

    useEffect(() => {
        if (!msg) return;
        const timer = setTimeout(() => {
            setMsg((pre) => ({ ...pre, msg: '' }));
        }, 3000);
        return () => clearTimeout(timer);
    }, [msg, setMsg]);

    if (!msg) return null;

    return (
        <div className='quickmsg'>
            <p>{msg}</p>
        </div>
    );
}
