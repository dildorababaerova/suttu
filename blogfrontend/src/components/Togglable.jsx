import { useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

const hideVisible = {display: visible ? 'none' : ''}
const showVisible = {display: visible ? '' : 'none'}

const toggleVisibility =() =>{
    setVisible(!visible)
}

return (
<div>
    <div style = {hideVisible}>
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>
    <div style = {showVisible}>
        {props.children}
    <button onClick={toggleVisibility}>cancel</button>
    </div>
</div>
)
}

export default Togglable