import Button from '../Help/Button'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { useState } from 'react'

import NameCreate from './NameCreate'
import PasswordCreate from './PasswordCreate'
import QuickMsg from '../Help/Quickmsg'
import Loading from '../Help/Loading'


export default function createform() {
    const [create, setCreate] = useState({ page: 1 })
    const [value, setValue] = useState({ name: '', username: '', password: '', repassword: '' })
    const [wait, setWait] = useState({ loading: "", isload: false, stop: true, quick: "", error: false, alert: '', qerror: false })


    function submitname() {
        if (create.page == 1) {
            if (!value.name.trim() || !value.username.trim() || wait.stop) {
                setWait(pre => ({ ...pre, quick: '', alert: '', qerror: false }));
                setTimeout(() => {
                    setWait(pre => ({ ...pre, quick: 'Fill all credentials', qerror: true }));
                }, 0);

                return;
            }

            setWait(pre => ({ ...pre, quick: '', qerror: false, alert: '' }));
            setCreate(pre => ({ ...pre, page: 2 }));
        }

        if (create.page == 2) {
            if (value.password === '') {
                setWait(pre => ({ ...pre, alert: "Oops! Password missing", error: true }));
            } else if (value.password.length <= 4) {
                setWait(pre => ({ ...pre, alert: "Almost there, add a few more letters in password", error: true }));
            } else if (value.password !== value.repassword) {
                setWait(pre => ({ ...pre, alert: "Oops! Password not matching.", error: true }));
                setValue((pre) => ({ ...pre, repassword: '' }));
            } else {
                userRegister();
            }

        }
    }

    async function userRegister() {
        if (wait.isload) return;

        try {
            setWait((pre) => ({ ...pre, isload: true, loading: 'Uploading your information...', quick: '', alert: "", error: false }));

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/registerUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: value.name,
                    username: value.username,
                    password: value.password
                }),
            });

            const data = await response.json();

            setWait((pre) => ({ ...pre, isload: false, loading: '' }));

            if (data?.error) {
                setWait(pre => ({ ...pre, quick: data.message, qerror: true }));
                return;
            }

            setValue({ name: '', username: '', password: '', repassword: '', good: data.message });
            setCreate(pre => ({ ...pre, page: 3 }));
            localStorage.setItem("token", data.token);
            window.location.replace('/taskly/private');

        } catch (err) {
            setWait(pre => ({ ...pre, isload: false, loading: '', quick: 'Internal Server Error', qerror: true }));
        }
    }



    return (
        <div className="formcreate isFlex">

            {
                create.page == 3 ?
                    <div className='anmisuccess isFlex'>
                        <DotLottieReact
                            src="https://lottie.host/63d04670-6e54-473a-89ff-711a8f1b94dc/kfSr22ptlz.lottie"
                            loop
                            autoplay
                        />
                        <h1>{value.good}</h1>
                    </div> :
                    <>
                        <img src="./Svg/textLogo.svg"></img>
                        {
                            create.page == 1 ?
                                <NameCreate
                                    submitname={submitname}
                                    value={value}
                                    setValue={setValue}
                                    wait={wait}
                                    setWait={setWait} />
                                :
                                <PasswordCreate
                                    submitname={submitname}
                                    value={value}
                                    setValue={setValue}
                                    wait={wait}
                                    setWait={setWait}
                                />


                        }
                        <div className='createbtndiv isFlex'>
                            {create.page != 1 &&
                                <Button
                                    msg="Back"
                                    typ={1}
                                    fn={() => {
                                        if (create.page == 2) setCreate((pre) => ({ ...pre, page: 1 }))
                                    }}
                                />}
                            <Button
                                msg={create.page == 2 ? "Create" : "Next"}
                                typ={5}
                                fn={submitname}

                            />


                        </div>
                    </>
            }
            <QuickMsg msg={wait.quick} error={wait.qerror} />
            <Loading msg={wait.loading} show={wait.isload} />
        </div>
    )
}