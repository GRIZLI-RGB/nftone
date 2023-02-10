import { useContext } from "react";
import uuid from "react-uuid";
import { ContextApp } from "../../Context";
import "./Checkbox.scss";

function Checkbox({ text, onClick }) {
    const {changeTheme} = useContext(ContextApp);
    const unicalID = uuid();
    return (
    <div className={`checkbox ${changeTheme(null, "checkbox--dark")}`}>
            <input className="checkbox__input" type="checkbox" id={unicalID} />
            <label className="checkbox__label" for={unicalID} onClick={onClick}>
                {text}
            </label>
        </div>
    );
}

export default Checkbox;
