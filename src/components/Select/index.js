import { useContext, useState } from "react";
import "./Select.scss";
import { ContextApp } from "../../Context";

function Select({ values, value, setValue }) {
    const { changeTheme, theme, setCurrentCollection } = useContext(ContextApp);
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{ backgroundColor: changeTheme("#fff", "#1C2026"), borderColor: changeTheme("#e3e3e3", "#596577") }}
            className={`select ${changeTheme("", "select--dark")}`}
            onClick={() => {
                setOpen(!open);
            }}>
            <p className="select__text">{value ? value : "Choose"}</p>
            <img
                className="select__arrow"
                src={`./img/sections/createNFT/arrow-${theme}.png`}
                alt=""
                style={{ transform: open ? "rotate(-180deg)" : "" }}
            />
            {open && (
                <ul className="select__content">
                    {values.map(item => (
                        <li
                            className="select__content-item"
                            onClick={e => {
                                setValue(e.target.outerText);
                            }}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Select;
