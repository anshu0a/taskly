import '../../cssFile/Home-css/AddingONeTask.css'
import { useState } from 'react'
import Back from './Back'
import Button from '../Help/Button'
import InputTemp from './InputTemplet'
import Loading from '../Help/Loading'
import QuickMsg from '../Help/Quickmsg'

export default function addingOneTask({}) {
    const [more, setMore] = useState(false)
    const [wait, setWait] = useState({ isload: false, loadmsg: '', quick: "", error: false })
    const [value, setvalue] = useState({ taskexist: true, errorTitle: '', errorPurpose: '', title: '', purpose: '', priority: 75, type: 'personal', about: '', timeLine: 1, voice: null, voicePreview: null, images: [], })

    async function taskAdd() {
        if (value.taskexist || value.errorTitle != '' || value.errorPurpose != '' || value.title == '' || value.purpose == '') {
            setWait(prev => ({ ...prev, quick: 'something is against the rule %-+%' + Date.now() }));
            return;
        }
        try {
            setWait((pre) => ({ ...pre, isload: true, loadmsg: "We are adding task...", quick: "", error: false, }));
            const formData = new FormData()
            formData.append('title', value.title)
            formData.append('purpose', value.purpose)
            formData.append('priority', value.priority)
            formData.append('type', value.type)
            formData.append('about', value.about)
            formData.append('timeLine', value.timeLine)

           
            if (value.voice) formData.append('voice', value.voice)

            // Append images if exist
            value.images.forEach((imgObj) => {
                if (imgObj.file) formData.append('images', imgObj.file)
            })

            const data = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            }).then((res) => res.json())
            if (data.notLogin) {
                window.location.href = "/login";
            }
            console.log(data)
            if (!data.error) {
                setWait((pre) => ({ ...pre, isload: false, msg: "", quick: data.message + "%-+%" + Date.now(), error: false, }));
                setvalue({ errorTitle: '', errorPurpose: '', title: '', purpose: '', priority: 75, type: 'personal', about: '', timeLine: 1, voice: null, voicePreview: null, images: [], })
                window.history.back();
            } else {
                setWait((pre) => ({ ...pre, isload: false, msg: "", quick: data.message + "%-+%" + Date.now() || "somthing went wrong.", error: true, }));
            }
        } catch (err) {
            console.log('error from backend while saving task:', err)
            setWait((pre) => ({ ...pre, isload: false, msg: "", quick: err.message  + "%-+%" + Date.now() || "somthing went wrong.", error: true, }));

        }
    }

    return (
        <>
            <div className='top'>
                <div className='hometop'>
                    <Back setIsAdd={()=>window.history.back()} />
                    <p style={{ textAlign: 'end' }}>
                        Adding a task
                        <br />
                        <span>Organize today for a better tomorrow.</span>
                    </p>
                </div>
            </div>
            <div className='mainBody'>
                <div className='outhome isFlex'>
                    <InputTemp msg='Title of your Task *' typ={1} value={value} setvalue={setvalue} />
                    <InputTemp msg='Time line of your Task' typ={2} value={value} setvalue={setvalue} />
                    {more ? (
                        <>
                            <div className='morelessinps' onClick={() => setMore(false)}>
                                Less Changes
                            </div>
                            <InputTemp msg='Priority level of your Task' typ={3} value={value} setvalue={setvalue} />
                            <InputTemp msg='Description of your Task' typ={4} value={value} setvalue={setvalue} />
                            <InputTemp msg='A Voice message to your Task' typ={5} value={value} setvalue={setvalue} />
                            <InputTemp msg='Some Images for your Task' typ={6} value={value} setvalue={setvalue} />
                        </>
                    ) : (
                        <div className='morelessinps' onClick={() => setMore(true)}>
                            More Changes
                        </div>
                    )}

                    <div className='btndivinput'>
                        <Button msg='Create Task' fn={()=>taskAdd()} typ={1} />
                    </div>
                </div>
            </div>
            <Loading msg={wait.loadmsg} show={wait.isload} />
            <QuickMsg msg={wait.quick} error={wait.error} />
        </>
    )
}
