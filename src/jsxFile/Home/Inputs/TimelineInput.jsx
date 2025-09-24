import '../../../cssFile/Home-css/AddingONeTask.css'


export default function timelineinputs({ value, setvalue }) {
   function setTime(e) {
  let tim = e.target.value;

  if (tim === "") {
    setvalue((pre) => ({ ...pre, timeLine: "" }));
    return;
  }
  let num = Number(tim);
  if (isNaN(num)) return
  if (num < 1) num = 1;
  if (num > 99) return;

  setvalue((pre) => ({ ...pre, timeLine: num }));
}


    return (
        <div className="maininps isFlex">
            <input
                name='timeLine'
                onChange={setTime}
                value={value.timeLine}
                className='dayinp'
                type="number"
            />
            <p className='daystext'>Days</p>
        </div>
    )
}