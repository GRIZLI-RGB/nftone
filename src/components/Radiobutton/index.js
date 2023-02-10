import { useContext } from "react";
import uuid from "react-uuid";
import { ContextApp } from "../../Context";
import "./Radiobutton.scss";

function Radiobutton({ text, group, onClick }) {
    const {changeTheme} = useContext(ContextApp);
    const unicalID = uuid();
    return (
        <div className={`radiobutton ${changeTheme(null, "radiobutton--dark")}`}>
            <input className="radiobutton__input" name={group} type="radio" id={unicalID} />
            <label className="radiobutton__label" for={unicalID} onClick={onClick}>
                {text}
            </label>
        </div>
    );
}

export default Radiobutton;
