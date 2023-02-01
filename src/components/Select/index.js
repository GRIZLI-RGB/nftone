import { useContext, useState } from "react";
import "./Select.scss";
import { ContextApp } from "../../Context";

function Select() {
    const { changeTheme,theme } = useContext(ContextApp);
    const [open, setOpen] = useState(false);

    // Здесь лежит текущий выбор пользователя, если выбора нет - пустая строка
    const [current, setCurrent] = useState("");
    return (
        <div
            style={{ backgroundColor: changeTheme("#fff", "#1C2026"), borderColor: changeTheme("#e3e3e3", "#596577") }}
            className={`select ${changeTheme("", "select--dark")}`}
            onClick={() => {
                setOpen(!open);
            }}>
            <p className="select__text">{current ? current : "Choose"}</p>
            <img
                className="select__arrow"
                src={`./img/sections/createNFT/arrow-${theme}.png`}
                alt=""
                style={{ transform: open ? "rotate(-180deg)" : "" }}
            />
            {open && (
                <ul className="select__content">
                    <li
                        className="select__content-item"
                        onClick={e => {
                            setCurrent(e.target.outerText);
                        }}>
                        Item 1
                    </li>
                    <li
                        className="select__content-item"
                        onClick={e => {
                            setCurrent(e.target.outerText);
                        }}>
                        Item 2
                    </li>
                    <li
                        className="select__content-item"
                        onClick={e => {
                            setCurrent(e.target.outerText);
                        }}>
                        Item 3
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Select;
