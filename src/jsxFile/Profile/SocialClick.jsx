import '../../cssFile/Profile-css/AddLinks.css'

export default function socialClick({ msg, tab, setTab, item, isExist }) {
    const message = (msg == "fa") ? "Facebook" : msg == "li" ? "Linkedin" : msg == "yo" ? "Youtube" : msg == "gi" ? "Github" : msg == "te" ? "Telegram" : msg == "tw" ? "Twitter" : msg == "sn" ? "Snapchat" : msg == "wh" ? "Whatsapp" : msg == "gm" ? "Gmail" : "Other url"


    return (<div onClick={() => { setTab((pre) => ({ ...pre, id: item?._id, url: item?.goto || "", type: msg, msg: message, title: message, page: 1 })) }} className="oneprtx isFlex">
        <div className='fstPrt isFlex'>
            <img className='socialicn' src={`/Svg/Accounts/${msg}.svg`} />
            <p className='socialtext'>Link your {message} </p>
        </div>
        {isExist && <svg className='greenTick' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
        </svg>}
    </div>)
}