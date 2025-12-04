import '../../cssFile/ViewChallenges-css/DeleteDare.css'
import { useState } from 'react'

import Button from '../Help/Button'
import Verifyer from '../Help/Verifyer'
import Quick from '../Help/NewQuick'
import Loading from '../Help/Loading'

export default function ({ type, dareId, title }) {

    const [data, setData] = useState({ msg: "", loading: false });
    const [remove, setRemove] = useState(false)

    const killDare = async function () {
        try {
            if (data.loading) return;

            setData(pre => ({ ...pre, loading: true }));

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/deleteDare/${dareId}/${type}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (result.notLogin) {
                window.location.href = "/login";
                return;
            }

            if (!result.error) {
                console.log(result.dare);
                window.history.back();
                setData(pre => ({ ...pre, msg: result.message, loading: false }));
            } else {

                setData(pre => ({ ...pre, msg: result.message, loading: false }));
            }

        } catch (er) {
            setData(pre => ({ ...pre, msg: "Something went wrong", loading: false }));
            console.log("error in delete page : ", er);
        }
    };


    return (
        <div className='deleteDare isFlex'>
            <div className="oneDel isFelx">
                <p className="ppmm txtdel">
                    {
                        type == 'g' ?
                            "  Once you un-grab this dare, it will be permanently removed from your list, cannot be recovered later, and you will need to start from the beginning if you grab it again."
                            : type == 'c' ?
                                "leaving this collaboration will permanently remove your access, progress, and shared data. You cannot recover it later and must request access again to rejoin in the future."
                                :
                                "deleting this dare will permanently remove it for all users, along with all progress and data. This action cannot be undone, and the task cannot be recovered later."

                    }
                </p>
                <div className='btnbox'>
                    <Button fn={() => setRemove(true)} typ={2} msg={type == 'g' ?
                        "Un grab"
                        : type == 'c' ?
                            "Quit Collab"
                            :
                            "Delete"} />
                </div>
            </div>
            {remove && <Verifyer msg={title} setRemove={setRemove} fn={killDare} />}
            <Loading msg={type == 'g' ? "Un grabing dare" : type == 'c' ? "Quiting this Collab" : "Deleteing dare"} show={data.loading} />
            <Quick msg={data.msg} setMsg={setData} />
        </div>
    )
}