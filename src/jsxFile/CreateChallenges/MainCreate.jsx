import '../../cssFile/CreateChallenges-css/MainCreate.css'
import '../../cssFile/Home-css/AddingOneTask.css'
import { useState } from 'react'

import Back from '../Help/Back'
import Button from '../Help/Button'
import InputTemp from '../Home/InputTemplet'
import Loading from '../Help/Loading'
import QuickMsg from '../Help/NewQuick'

export default function mainCreate() {
    const [more, setMore] = useState(false)
    const [wait, setWait] = useState({ isload: false, loadmsg: '', msg: "", });
    const [value, setvalue] = useState({ allDares: [], collab: [], taskexist: true, errorTitle: '', errorPurpose: '', title: '', purpose: '', priority: 75, type: 'personal', about: '', timeLine: 7, voice: null, voicePreview: null, images: [], })

    async function dareAdd() {
        if (value.taskexist || value.allDares.length == 0 || value.errorTitle != '' || value.errorPurpose != '' || value.title == '' || value.purpose == '') {
            setWait(prev => ({ ...prev, msg: 'something is against the rule ' }));
            return;
        }
        try {
            setWait((pre) => ({ ...pre, isload: true, loadmsg: "We are adding dare...", msg: "", }));
            const formData = new FormData()
            const collabIds = value.collab.map(c => c.id);

            formData.append('title', value.title)
            formData.append('purpose', value.purpose)
            formData.append('priority', value.priority)
            formData.append('type', value.type)
            formData.append('about', value.about)
            formData.append('timeLine', value.timeLine)

            formData.append('allDares', JSON.stringify(value.allDares));
            formData.append('collab', JSON.stringify(collabIds));


            if (value.voice) formData.append('voice', value.voice)

            value.images.forEach((imgObj) => {
                if (imgObj.file) formData.append('images', imgObj.file)
            })

            const data = await fetch(`${import.meta.env.VITE_API_URL}/api/addOneDare`, {
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
                setWait((pre) => ({ ...pre, isload: false, msg: "", }));
                setvalue({allDares: [], collab: [],  errorTitle: '', errorPurpose: '', title: '', purpose: '', priority: 75, type: 'personal', about: '', timeLine: 1, voice: null, voicePreview: null, images: [], })
                 window.history.back();
            } else {
                setWait((pre) => ({ ...pre, isload: false, msg: "" }));
            }
        } catch (err) {
            console.log('error from backend while saving task:', err)
            setWait((pre) => ({ ...pre, isload: false, msg: "" }));

        }
    }


    return (<>
        <div className="top  isFlex">
            <div className='hometop'>
                <Back setIsAdd={() => window.history.back()} />
                <p style={{ textAlign: 'end' }}>
                    Start a Challenge
                    <br />
                    <span>Because Every Challenge Shapes You.</span>
                </p>
            </div>
        </div>
        <div className='mainBody maincreate1'>
            <div className='outhome isFlex'>
                <InputTemp msg='Title of your Dare *' notTask={true} typ={1} value={value} setvalue={setvalue} />

                <InputTemp msg='Add all your Dares' typ={7} value={value} setvalue={setvalue} />
                <InputTemp msg='Time line of your Dare' typ={2} value={value} setvalue={setvalue} />
                {more ? (
                    <>
                        <div className='morelessinps' onClick={() => setMore(false)}>
                            Less Changes
                        </div>
                        <InputTemp msg='Collaborate on this dare with' typ={8} value={value} setvalue={setvalue} />
                        <InputTemp msg='Priority level of your Dare' notTask={true} typ={3} value={value} setvalue={setvalue} />
                        <InputTemp msg='Description of your Dare' notTask={true} typ={4} value={value} setvalue={setvalue} />
                        <InputTemp msg='A Voice message to your Dare' typ={5} value={value} setvalue={setvalue} />
                        <InputTemp msg='Some Images for your Dare' typ={6} value={value} setvalue={setvalue} />
                    </>
                ) : (
                    <div className='morelessinps' onClick={() => setMore(true)}>
                        More Changes
                    </div>
                )}

                <div className='btndivinput'>
                    <Button msg='Create Challenge' fn={dareAdd} typ={1} />
                </div>
            </div>
        </div>
        <Loading msg={wait.loadmsg} show={wait.isload} />
        <QuickMsg msg={wait.msg} setMsg={setWait} />
    </>
    );
}



