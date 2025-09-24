import '../../../cssFile/Home-css/AddingOneTask.css'
import { useRef } from 'react'
import TextField from '@mui/material/TextField';

export default function titleInputs({ value, setvalue }) {
    const checkingTimeout = useRef(null);
    function setTitle(e) {
        const { name, value: val } = e.target;
        let newval = val;
        if (name == 'title') {
            newval = newval.trimStart();
            newval = newval.replace('  ', " ");
            clearTimeout(checkingTimeout.current);
            setvalue((pre) => ({ ...pre, taskexist: true }))
            if (newval == '') setvalue((pre) => ({ ...pre, errorTitle: "Title is requird." }))
            else {
                setvalue((pre) => ({ ...pre, errorTitle: "", }))
                checkingTimeout.current = setTimeout(() => {
                    taskExist(newval);
                }, 1000);

            }
            if (newval.length > 40) return;
        }
        if (name == 'purpose') {
            newval = newval.trimStart();
            newval = newval.replace('  ', " ");
            if (newval == '') setvalue((pre) => ({ ...pre, errorPurpose: "Purpose is requird." }))
            else setvalue((pre) => ({ ...pre, errorPurpose: "" }))
            if (newval.length > 100) return;
        }

        setvalue((pre) => ({ ...pre, [name]: newval }))

    }

    async function taskExist(value) {
        console.log("hello to text check")
        try {
            const response = await fetch("/https://tasklyserver-0ux1.onrender.com/api/isTaskExist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ title: value }),
            });

            const data = await response.json();
            if (data.notLogin) {
                window.location.href = "/login";
            }
            if (!data.error) {
                if (!data.exists) setvalue((pre) => ({ ...pre, taskexist: false, errorTitle: "" }))
                else setvalue((pre) => ({ ...pre, taskexist: true, errorTitle: "title name allready in use." }))
            } else {
                setvalue((pre) => ({ ...pre, errorTitle: "Somthing went wrong try again." }))
            }
            console.log("coming from  is task ; ", data)
        } catch (err) {
            console.log(err.message || "error in is task exist.")
        }
    }


    return (
        <div className="maininps isFlex">
            <TextField
                autoComplete='off'
                name='title'
                value={value.title}
                onChange={setTitle}
                className="taskName"
                label="Task name"
                variant="standard"
                helperText={value.errorTitle || "Give a clear task name."}
                error={value.errorTitle != ''}
                sx={{
                    m: 1,
                    width: "40ch",
                    "& .MuiInputLabel-root": { fontSize: "1rem" },
                    "& .MuiFormHelperText-root": { fontSize: "0.7rem" },
                    "& .MuiInputBase-input": { fontSize: ".9rem" },
                }}
            />

            <TextField
                autoComplete='off'
                name='purpose'
                value={value.purpose}
                onChange={setTitle}
                className="purpusInp"
                label="Purpose"
                variant="standard"
                helperText={value.errorPurpose || "Why this task matters ?"}
                error={value.errorPurpose != ''}
                sx={{
                    m: 1,
                    width: "40ch",
                    "& .MuiInputLabel-root": { fontSize: "1rem" },
                    "& .MuiFormHelperText-root": { fontSize: "0.7rem" },
                    "& .MuiInputBase-input": { fontSize: ".9rem" },
                }}
            />

        </div>
    )
}