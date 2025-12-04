import '../../../cssFile/Home-css/MyTask.css'

import OneTask from './OneTask'
import NoTask from '../NoTask'
import Loader from './Loader'
import QuickMsg from '../../Help/NewQuick'
import { useState } from 'react'
export default function mytask({ isloading, data, setData, user }) {
    const [msg, setMsg] = useState({ msg: "" });
    return (
        <div className="mytask">
            {msg.msg != '' && <QuickMsg msg={msg.msg} setMsg={setMsg} />}
            {
                isloading ?
                    Array.from({ length: 12 }, (_, i) => <Loader key={i} />)
                    :
                    data?.length == 0 ?
                        <NoTask msg="Add your first task" type='task' pic="1"  />
                        :
                        <>
                            {data.map((onedata, ind) => (
                                <OneTask type="presonal" setMsg={setMsg} key={ind} setData={setData} user={user} data={onedata} />
                            ))}
                        </>
            }
        </div>

    )
}