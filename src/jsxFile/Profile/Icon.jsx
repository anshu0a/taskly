import '../../cssFile/Profile-css/Icon.css'

export default function ({ msg, fn }) {
    return (<div onClick={fn} className={msg == "Share" ? 'outIcon isFlex' : 'outIcon extraCssIcon isFlex'}>
        {msg == "Share" ?
            <svg className='whatisIcon' viewBox="0 0 192 192" fill="none">
                <path strokeWidth="8" d="M108.92 70.323a35.784 36.301 0 1 1 25.311 61.978c-19.77 0-28.157-19.055-38.213-36.301C85.28 77.6 77.576 59.699 57.805 59.699a35.784 36.301 0 1 0 25.045 62.209" ></path>
            </svg>
            :
            <svg className='whatisIcon' viewBox="-6 -5 35 35" fill="none" >
                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                 <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        }
        <p className='msgIs'>{msg}</p>
    </div>)
}