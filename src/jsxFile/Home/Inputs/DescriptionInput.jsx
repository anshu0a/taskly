import '../../../cssFile/Home-css/AddingOneTask.css'


export default function descriptionInput({value,setvalue}) {
      function setAbout(e) {
        const { name, value: val } = e.target;
        setvalue((pre) => ({ ...pre, [name]: val }))
    }
    return (
        <div className="maininps isFlex">
            <textarea 
            name='about'
            onChange={setAbout}
            value={value.about}
            className='textareainp' 
            placeholder='Describe your task...'
            ></textarea>
        </div>
    )
}