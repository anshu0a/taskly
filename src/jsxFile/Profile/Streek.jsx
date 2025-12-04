import '../../cssFile/Profile-css/Streek.css'
export default function({streek , typ}){
    return (
         <div className="streekDay isFlex">
                    <img className='firestreekis' src={`/Svg/Accounts/${typ ? "merit" : "fire"}.svg`} />
                    <p className=' cntStreek ppmm'>{streek}</p>
                </div>
    )
}