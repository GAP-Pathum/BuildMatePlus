import React from "react";
import { Navigate} from "react-router-dom";
import closeIcon from "../Assets/close.png";

const close = () =>
function handleClose() {
    Navigate("/Pages/Home"); // Navigate to the home page
return (
        <div className="closebtn">
    <img
        src={closeIcon}
        alt="Close"
        className="close-icon"
        onClick={handleClose}
        style={{
            filter: 'invert(100%)',
            position: 'absolute',
            top: '10px',
            right: '10px',
            margin: '2%',
            width: '30px',
            height: '30px',
            cursor: 'pointer'
        }}
    />
</div>
);
}
export default close;
