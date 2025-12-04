import '../../../cssFile/Home-css/FrndTask.css'
import OneTask from '../Private/OneTask'
import Loader from '../Private/Loader'
import NoTask from '../NoTask'
import QuickMsg from '../../Help/NewQuick'
import {useState} from 'react'
export default function frndtask({ isloading, data, setData, user }) {
    const [msg, setMsg] = useState({ msg: "" });
    return (
        <div className="mytask">
            {msg.msg != '' && <QuickMsg msg={msg.msg} setMsg={setMsg} />}
            {
                isloading ?
                    Array.from({ length: 12 }, (_, i) => <Loader key={i} />)
                    :
                    data?.length == 0 ?
                        <NoTask msg="Add your first task" type='task' pic="2"  />
                        :
                        <>
                            {data.map((onedata, ind) => (
                                <OneTask type='public' setMsg={setMsg} key={ind} user={user} data={onedata} setData={setData} />
                            ))}
                        </>
            }
        </div>

    )
}