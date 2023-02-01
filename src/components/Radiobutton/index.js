import uuid from "react-uuid";
import "./Radiobutton.scss";

function Radiobutton({ text, group }) {
    const unicalID = uuid();
    return (
        <div className="radiobutton">
            <input className="radiobutton__input" name={group} type="radio" id={unicalID} />
            <label className="radiobutton__label" for={unicalID}>
                {text}
            </label>
        </div>
    );
}

export default Radiobutton;
