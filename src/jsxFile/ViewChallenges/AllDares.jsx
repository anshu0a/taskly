import '../../cssFile/ViewChallenges-css/AllDares.css';
import { useEffect, useState } from 'react';
import Button from '../Help/Button';
import Quick from '../Help/NewQuick';
import Loading from '../Help/Loading';

export default function AllDares({ all, setData, type, dareId }) {
    const [data, setDatass] = useState({ sts: false, msg: "", loading: false });
    const [icons, setIcons] = useState([]);


    useEffect(() => {
        if (icons.length === 0 && all.length > 0) {
            setIcons(Array.from({ length: all.length }, () => Math.floor(Math.random() * 17)));
        }
        setDatass(pre => ({
            ...pre,
            sts: all.length > 0 && all.every(v => v.isDone)
        }));
    }, [all, icons.length]);


    const markDare = async (oneId, work) => {
        try {
            if (data.loading) return;
            setDatass(pre => ({ ...pre, loading: true, msg: "" }));

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/markDare/${dareId}/${oneId}/${work}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    credentials: "include",
                }
            );

            const data2 = await response.json();

            if (data2.notLogin) {
                window.location.href = "/login";
                return;
            }

            if (!data2.error) {
                setData(pre => ({ ...pre, allThings: { ...pre.allThings, allDares: data2.allDares } }));


                const allDone = data2.allDares.every(item => item.isDone);
                setDatass(pre => ({ ...pre, sts: allDone, msg: data2.message }));
            } else {
                setDatass(pre => ({ ...pre, msg: data2.message }));
            }

        } catch (err) {
            console.error("Error marking dare:", err);
            setDatass(pre => ({ ...pre, msg: "Something went wrong." }));
        } finally {
            setDatass(pre => ({ ...pre, loading: false }));
        }
    };

    const updateStreek = async (oneId, work) => {
        try {
            if (data.loading) return;
            setDatass(pre => ({ ...pre, loading: true, msg: "" }));

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/updateStreek/${dareId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    credentials: "include",
                }
            );

            const data2 = await response.json();

            if (data2.notLogin) {
                window.location.href = "/login";
                return;
            }
            if (!data2.error) {
                setData((pre) => ({ ...pre, allThings: { ...pre.allThings, streek: data2.streek } }))
            }
            setDatass(pre => ({ ...pre, msg: data2.message, }));

        } catch (err) {
            console.error("Error marking dare:", err);
            setDatass(pre => ({ ...pre, msg: "Something went wrong." }));
        } finally {
            setDatass(pre => ({ ...pre, loading: false }));
        }
    };

    return (
        <div className="allinOneDares ">

            {all.map((one, ind) => (
                <div key={one._id} className='onedare isFlex'>
                    <div className="dtl isFlex">
                        <img className='icondare' src={`/Svg/dares/${icons[ind]}.svg`} />
                        <p className='ppmm ohtxt'>{one.one}</p>
                    </div>

                    {type && (
                        <div className='chk isFlex'>
                            <svg
                                className={one.isDone ? 'chckit mrk' : 'chckit'}
                                viewBox="0 0 24 24"
                                onClick={() => markDare(one._id, !one.isDone)}
                            >
                                <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
                                <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}

            <div className='btndiiv isFlex'>
                {data.sts && <Button fn={updateStreek} typ={5} msg={"Complete it"} />}
            </div>

            <Quick msg={data.msg} setMsg={setDatass} />
            <Loading msg="Loading . . ." show={data.loading} />

        </div>
    );
}
