import '../../../cssFile/Home-css/AddingOneTask.css'


export default function descriptionInput({ value, setvalue, notTask}) {
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
                placeholder={notTask ? 'Describe your dare...' : 'Describe your task...'}
            ></textarea>
        </div>
    )
}