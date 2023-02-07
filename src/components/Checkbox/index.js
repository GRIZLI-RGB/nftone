import uuid from "react-uuid";
import "./Checkbox.scss";

function Checkbox({ text, onClick }) {
    const unicalID = uuid();
    return (
        <div className="checkbox">
            <input className="checkbox__input" type="checkbox" id={unicalID} />
            <label className="checkbox__label" for={unicalID} onClick={onClick}>
                {text}
            </label>
        </div>
    );
}

export default Checkbox;
