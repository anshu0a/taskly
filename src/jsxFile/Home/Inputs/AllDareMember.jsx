import '../../../cssFile/Home-css/AddingOneTask.css'
import { useState, useEffect } from 'react';
import Quick from '../../Help/NewQuick'
import OneAddUser from '../../CreateChallenges/OneAddUser';
import OneUser from '../../CreateChallenges/OneUser';

export default function allaDareTask({ value, setvalue, setCan }) {
    const [search, setSearch] = useState({ msg: "", sch: "", friends: [], demoFrnd: [] });

    const addSearch = (e) => {
        let { value: val, name } = e.target;
        val = val.replace(/\s+/g, "_");

        setSearch(prev => ({
            ...prev,
            [name]: val,
            demoFrnd: prev.friends.filter(f =>
                f.username.toLowerCase().includes(val.toLowerCase()) &&
                !value.collab.some(c => c.id === f.id)
            )
        }));
    };



    const addCandidate = function (id) {
        if (!id) return;

        const selected = search.friends.find(f => f.id === id);
        if (!selected) {
            console.warn("addCandidate: selected friend not found for id:", id);
            return;
        }

        setvalue(prevValue => {
            const prevCollab = Array.isArray(prevValue.collab) ? prevValue.collab : [];

            if (prevCollab.some(c => c.id === id)) return prevValue;

            const updatedCollab = [...prevCollab, selected];

            setSearch(prevSearch => ({
                ...prevSearch,
                demoFrnd: prevSearch.friends.filter(fr =>
                    fr.id !== id && !updatedCollab.some(c => c.id === fr.id)
                )
            }));

            return { ...prevValue, collab: updatedCollab };
        });
    };

    const removeCandidate = function (id) {
        
        setvalue(prevValue => {
            const removed = prevValue.collab.find(c => c.id === id);
            if (!removed) return prevValue;

            const updatedCollab = prevValue.collab.filter(c => c.id !== id);

            setSearch(prev => ({
                ...prev,
                demoFrnd: [...prev.demoFrnd, removed]
            }));

            return { ...prevValue, collab: updatedCollab };
        });
    };



    useEffect(() => {
        async function getMyFrnd() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/getMyFrnd`,
                    {
                        method: "GET",
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
                if (!data.error) {
                    console.log(data)
                    if (data.friends.length <= 0) {
                        setCan(false);
                    }
                    setSearch((pre) => ({ ...pre, friends: data.friends, demoFrnd: data.friends, msg: "" }))
                } else {
                    setSearch((pre) => ({ ...pre, msg: data.message }))
                }


            } catch (err) {
                console.log("Error from server at home :", err);
            }
        }
        getMyFrnd()
    }, [])


    return (
        <div className="maininps isFlex">
            {value.collab?.length > 0 &&
                <div className="userBox isFlex">
                    {
                        value.collab.map((one, ind) => (<OneUser removeCandidate={removeCandidate} key={ind} one={one} />))
                    }

                </div>
            }
            <div className='schDiv isFlex'>
                <label className='lbl' htmlFor='sch'>Search Friend's Username</label>
                <input
                    id="sch"
                    type="text"
                    placeholder='Eg: anshu_01'
                    name="sch"
                    value={search.sch}
                    onChange={addSearch}
                />
                <div className="frndZone isFlex">
                    {
                        search.demoFrnd.slice(0, 4).map((one, ind) =>
                            <OneAddUser addCandidate={addCandidate} key={ind} one={one} />
                        )
                    }
                </div>
            </div>
            <Quick msg={search.msg} setMsg={setSearch} />
        </div>
    )
}