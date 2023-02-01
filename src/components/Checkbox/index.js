import uuid from "react-uuid";
import "./Checkbox.scss";

function Checkbox({ text }) {
    const unicalID = uuid();
    return (
        <div className="checkbox">
            <input className="checkbox__input" type="checkbox" id={unicalID} />
            <label className="checkbox__label" for={unicalID}>
                {text}
            </label>
        </div>
    );
}

export default Checkbox;
