import '../../cssFile/Help-css/Button.css'
export default function Bbutton({ msg, fn, typ ,off}) {
    return (
        <div 
        disabled
        onClick={() => !off && fn()}
        className="unibtn isFlex"
        style={
            typ == 1 ? 
            {backgroundColor:"rgb(59, 59, 59)"}:
            typ == 2 ? 
            {backgroundColor:" red"}:
            typ == 3 ? 
            {backgroundColor:" green"}:
            typ == 4 ? 
            {backgroundColor:" black"}:
            typ == 5 ? 
            { backgroundColor:" rgb(0, 119, 255)"}:
            typ == 6 ? 
            {backgroundColor:" rgb(123, 0, 255)"}:
            typ == 7 ? 
            {backgroundColor:" rgb(255, 145, 0)"}:
            typ == 8 ? 
            {backgroundColor:" rgb(0, 223, 223)"}:
            typ == 9 ? 
            {backgroundColor:" rgb(0, 25, 79)"}:
            {backgroundColor:" rgb(56, 0, 109)"}
          }
        >
            {msg}
        </div>)
}

    // 
    // 
    //
    // 
    // 
    // 
    // 
