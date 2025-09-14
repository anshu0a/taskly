import '../../cssFile/Home-css/AddingONeTask.css'

import Back from './Back'
import Button from '../Help/Button'
import InputTemp from './InputTemplet'

export default function addingOneTask({ setIsAdd }) {
   function onSubmit(){
console.log("hello")
   }
    return (
        <>
            <div className='top'>
                <div className="hometop">
                    <Back setIsAdd={setIsAdd} />
                    <p style={{ textAlign: "end" }}>Adding a task<br /><span>Organize today for a better tomorrow.</span></p>

                </div>
            </div>
            <div className='mainBody'>
                <div className="outhome isFlex">
                    <InputTemp msg="Title of your Task *" typ={1} />
                    <InputTemp msg="Time line of your Task *" typ={2} />
                    <InputTemp msg="Priority level of your Task" typ={3} />
                    <InputTemp msg="Description of your Task" typ={4} />
                    <InputTemp msg="A Voice message to your Task" typ={5} />
                    <InputTemp msg="Some Images for your Task" typ={6} />
                    <div className='btndivinput'><Button msg="Create Task" fn={onSubmit} typ={1}/></div>
                    
                </div>
            </div>
        </>
    )
}