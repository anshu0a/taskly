import '../../cssFile/Switch-css/OutIndex.css'

import Index from './Index';

export default function outIndex() {
    return (
        <div className="outIndex">
            <Index name="Tasks" />
            <Index name="Timers" />
            <Index name="Challenges" />
            <Index name="Settings" />

        </div>)
}