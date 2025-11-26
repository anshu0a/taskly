import '../../cssFile/Profile-css/AddLinks.css'
import { useState, useRef } from 'react'

import SocialClick from './SocialClick'
import Button from '../Help/Button'
import Quick from '../Help/NewQuick'

export default function allLinks({ setLink, link }) {
    const [msg, setMsg] = useState({ msg: '', off: false });
    const [tab, setTab] = useState({ page: 0, id: "", msg: "", title: '', type: "", url: "", error: false });
    const childRef = useRef(null);

    const list = ["li", "gi", "te", "wh", "gm", "sn","fa" ,"tw", "yo", "ot"];
    const newLinks = link.links.filter(l => list.includes(l.type));
    const oldLinks = list.filter(l => !link.links.some(linkItem => linkItem.type === l));

    async function addLink() {
        try {
            if (tab.url == '' || tab.title == '' || tab.error) {
                setMsg((pre) => ({ msg: "Invalid Title or url." }));
                return;
            }
            setMsg((pre) => ({ ...pre, off: true }));
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/addLink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    title: tab.title,
                    url: tab.url,
                    type: tab.type,
                })
            });

            const data = await response.json();
            if (data.notLogin) {
                window.location.href = "/login";
            }
            setMsg((pre) => ({ ...pre, msg: data.message }));
            if (!data.error) {
                setTab((pre) => ({ ...pre, page: 0, msg: "", title: '', id: "", type: "", url: "", error: false }))
                setMsg((pre) => ({ ...pre, off: false }));
                setLink((pre) => ({ ...pre, links: data.links }))
            }

        } catch (er) {
            console.log("error in addLink in profile : ", er);
            setMsg((pre) => ({ ...pre, msg: "Something went wrong.", off: false }));
        }
    }

    async function removeLink() {
        try {
            if (tab.url == '' || tab.title == '' || tab.error) {
                setMsg((pre) => ({ msg: "Invalid Title or url." }));
                return;
            }
            setMsg((pre) => ({ ...pre, off: true }));
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/removeLink/${tab.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
            });

            const data = await response.json();
            if (data.notLogin) {
                window.location.href = "/login";
            }
            setMsg((pre) => ({ ...pre, msg: data.message }));
            if (!data.error) {
                console.log(data)
                setTab((pre) => ({ ...pre, page: 0, msg: "", title: '', id: "", type: "", url: "", error: false }))
                setMsg((pre) => ({ ...pre, off: false }));
                setLink((pre) => ({ ...pre, links: data.links }))
            }

        } catch (er) {
            console.log("error in removeLink in profile : ", er);
            setMsg((pre) => ({ ...pre, msg: "Something went wrong.", off: false }));
        }
    }


    function addChg(e) {
        let { name, value } = e.target;
        value = value.replace(/\s+/g, "");

        if (name === "title") {
            if (value.length > 20) {
                return;
            }
        }
        if (name === "url") {
            const urlPattern = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+.*$/;
            if (!urlPattern.test(value)) {
                setTab((pre) => ({ ...pre, error: true }))
            } else {
                setTab((pre) => ({ ...pre, error: false }))
            }
        }
        setTab((pre) => ({ ...pre, [name]: value }));
    }



    const closeLink = (e) => {
        if (childRef.current && childRef.current.contains(e.target)) {
            return;
        }
        setLink((pre) => ({ ...pre, page: 0 }));
    };


    return (<div onClick={closeLink} className="BACKBLUR isFlex">
        <div ref={childRef} onClick={(e) => e.stopPropagation()} className="INDIV boxInLink">
            {tab.page == 0 ?
                <>
                    <div className='toppLink isFlex'> <p className="LinkingHead" >Linking your Social account.</p>
                    </div>
                    <div className='allSocial isFlex'>
                        {newLinks.map((item, i) => (
                            <SocialClick tab={tab} isExist={true} setTab={setTab} key={i} item={item} msg={item.type} />
                        ))}
                        {oldLinks.map((item, i) => (
                            <SocialClick tab={tab} setTab={setTab} key={i} msg={item} />
                        ))}
                    </div></>
                :
                <>
                    <div className='toppLink isFlex'>
                        <svg onClick={() => { setTab((pre) => ({ ...pre, page: 0, type: "", msg: "", url: "" })) }} className='isSvg' viewBox="0 0 1024 1024">
                            <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path>
                        </svg>
                        <p className="LinkingHead" >Linking your {tab.msg}.</p>
                    </div>
                    <div className='allImputs isFlex'>
                        <label className='lebelLink' htmlFor="title" >Give a title.</label>
                        <input
                            onChange={addChg}
                            name="title"
                            value={tab.title}
                            className='impLink'
                            placeholder='Eg. Telegram'
                            id="title"
                            type="text" />

                        <label className='lebelLink' htmlFor="url" >Your {tab.msg} Url ?</label>
                        <input
                            name="url"
                            onChange={addChg}
                            value={tab.url}
                            className='impLink'
                            placeholder='Paste your account url.'
                            id="url"
                            type="text" />

                        <div className='btnDivLink isFlex'>
                            {tab.id && <Button fn={removeLink} off={msg.off} typ="2" msg="Delete" />}
                            <Button off={msg.off} fn={addLink} typ="5" msg="Update" />
                        </div>
                    </div></>

            }
        </div>
        <Quick msg={msg.msg} setMsg={setMsg} />
    </div>)
}