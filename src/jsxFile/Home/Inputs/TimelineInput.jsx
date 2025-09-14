import '../../../cssFile/Home-css/AddingONeTask.css'


export default function timelineinputs() {
    return (
        <div className="maininps isFlex">
            <input defaultValue={1} className='dayinp' type="number"></input>
            <p className='daystext'>Days</p>
        </div>
    )
}