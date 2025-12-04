import '../../cssFile/ViewChallenges-css/Slider.css'
export default function({page, setPage, my}){
    return (
        <div className="sliderit isFlex">
            <p onClick={()=>setPage(0)} className={page == 0 ? 'slidSec atIs':'slidSec'}>Information</p>
            <p onClick={()=>setPage(1)} className={page == 1 ? 'slidSec atIs':'slidSec'}>Dares</p>
            <p onClick={()=>setPage(2)} className={page == 2 ? 'slidSec atIs':'slidSec'}>Decscription</p>
            <p onClick={()=>setPage(3)} className={page == 3 ? 'slidSec atIs':'slidSec'}>TimeLine</p>
            <p onClick={()=>setPage(4)} className={page == 4 ? 'slidSec atIs':'slidSec'}>People</p>
        </div>
    )
}