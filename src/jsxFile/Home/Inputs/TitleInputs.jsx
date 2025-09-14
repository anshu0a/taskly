import '../../../cssFile/Home-css/AddingONeTask.css'

import TextField from '@mui/material/TextField';

export default function titleInputs() {
    return (
        <div className="maininps isFlex">
            <TextField
                sx={{
                    m: 1,
                    width: "40ch",
                    "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                    "& .MuiFormHelperText-root": { fontSize: "0.9rem" },
                    "& .MuiInputBase-input": { fontSize: "1.2rem" },
                }}
                className="taskName"
                label="Title"
                variant="standard"
                helperText="Enter a clear task name"
                defaultValue=""
            />

            <TextField
                sx={{
                    m: 1,
                    width: "40ch",
                    "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                    "& .MuiFormHelperText-root": { fontSize: "0.9rem" },
                    "& .MuiInputBase-input": { fontSize: "1.2rem" },
                }}
                className="purpusInp"
                label="Purpose"
                variant="standard"
                helperText="Why this task matters"
                color="success"
                defaultValue=""
            />

        </div>
    )
}