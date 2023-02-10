import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import "./CreateNFT.scss";
import Select from "../../components/Select";
import RangeSlider from "../../components/RangeSlider";
import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import { useDropzone } from "react-dropzone";

function CreateNFT() {
    const { changeTheme, theme } = useContext(ContextApp);

    const [filename, setFilename] = useState("");

    // Здесь лежат все атрибуты
    const [attrs, setAttrs] = useState([{ "": "" }]);

    // Здесь лежат все теги
    const [tags, setTags] = useState(["Example"]);
    const [tagInput, setTagInput] = useState("");

    /*
        Drag-and-drop files (acceptedFiles - массив со всеми файлами,
            обнуляется при перезагрузке страницы)
    */
    const { acceptedFiles, getRootProps } = useDropzone();

    useEffect(() => {
        setFilename(acceptedFiles[0]?.path);
    }, [acceptedFiles[0]?.path]);

    // Добавляет теги
    function onChangeTagInput(e) {
        let currentValue = e.target.value;
        setTagInput(currentValue);
        if (currentValue[currentValue.length - 1] === " ") {
            setTagInput("");
            setTags([...tags, currentValue.slice(0, currentValue.length - 1)]);
        }
    }

    function deleteTag(e) {
        setTags(tags.filter(tag => e.target.getAttribute("data-tag") !== tag));
    }

    function deleteAttr() {
        let newMas = [...attrs];
        newMas.pop();
        setAttrs(newMas)
    }

    return (
        <>
            <Header />
            <section
                className={`createNFT ${changeTheme("", "createNFT--dark")}`}
                style={{ backgroundColor: changeTheme("#fff", "#15191E") }}>
                <div className="createNFT__left">
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className="createNFT__left-download"
                        style={{
                            backgroundColor: changeTheme("#f4f6f9", "#1C2026"),
                            borderColor: changeTheme("#efefef", "#1c2026"),
                            color: changeTheme("#000", "#fff"),
                        }}>
                        <img
                            className="createNFT__left-download-img"
                            src="./img/sections/createNFT/drag-and-drop.svg"
                            alt="Drag and drop NFT"
                        />
                        {filename ? (
                            <>
                                <p className="createNFT__left-download-drag">{filename}</p>
                            </>
                        ) : (
                            <>
                                <p className="createNFT__left-download-drag">Drag and drop photos here</p>
                                <p
                                    className="createNFT__left-download-or"
                                    style={{ color: changeTheme("#000", "rgba(255, 255, 255, 0.7)") }}>
                                    or
                                </p>
                            </>
                        )}
                        <button type="file" className="createNFT__left-download-browse">
                            Browse files
                        </button>
                    </div>
                    <div
                        className="createNFT__left-attr"
                        style={{
                            backgroundColor: changeTheme("#f4f6f9", "#1C2026"),
                            borderColor: changeTheme("#efefef", "#1c2026"),
                            color: changeTheme("#000", "#fff"),
                        }}>
                        <h6 className="createNFT__left-attr-title">Attributes</h6>
                        <div className="createNFT__left-attr-box">
                            {window.innerWidth <= 768 ? (
                                attrs.map((item, index) => (
                                    <>
                                        <div className="createNFT__left-attr-box-name">
                                            <label>Name</label>
                                            <input type="text" placeholder={`${!index ? "Price" : ""}`} />
                                        </div>
                                        <div className="createNFT__left-attr-box-value">
                                            <label>Value</label>
                                            <div>
                                            <input type="text" placeholder={`${!index ? "10$" : ""}`} />
                                            {
                                                index !== 0 && (
                                                    <div className="createNFT__left-attr-box-value-minus" onClick={() => deleteAttr()}></div>
                                                )
                                            }
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <>
                                    <div className="createNFT__left-attr-box-name">
                                        <label>Name</label>
                                        {attrs.map((item, index) => (
                                            <input type="text" placeholder={`${!index ? "Price" : ""}`} />
                                        ))}
                                    </div>
                                    <div className="createNFT__left-attr-box-value">
                                        <label>Value</label>
                                        {attrs.map((item, index) => (
                                            <div>
                                            <input type="text" placeholder={`${!index ? "10$" : ""}`} />
                                            {
                                                index !== 0 && (
                                                    <div className="createNFT__left-attr-box-value-minus" onClick={() => deleteAttr()}></div>
                                                )
                                            }
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            className="createNFT__left-attr-add"
                            onClick={() => {
                                setAttrs([...attrs, { "": "" }]);
                            }}>
                            + Add attribute
                        </button>
                    </div>
                </div>
                <div
                    class="createNFT__right"
                    style={{
                        backgroundColor: changeTheme("#f4f6f9", "#1C2026"),
                        borderColor: changeTheme("#efefef", "#1c2026"),
                        color: changeTheme("#000", "#fff"),
                    }}>
                    <h1 className="createNFT__right-title">Create single nft</h1>
                    <form className="createNFT__right-form" action="">
                        <div className="createNFT__right-form-name">
                            <label>Display Name</label>
                            <input type="text" placeholder="NFT name" />
                        </div>
                        <div className="createNFT__right-form-tags">
                            <label>Tags</label>
                            <div
                                className="createNFT__right-form-tags-box"
                                style={{
                                    background: changeTheme("#fff", "#1C2026"),
                                    borderColor: changeTheme("", "#596577"),
                                }}>
                                <div className="createNFT__right-form-tags-box-items">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="createNFT__right-form-tags-box-items-item"
                                            style={{ backgroundColor: changeTheme("", "rgba(255, 255, 255, 0.13)") }}>
                                            {tag}
                                            <img
                                                data-tag={tag}
                                                src={`./img/sections/createNFT/cross-${theme}.svg`}
                                                alt="Tag"
                                                onClick={e => {
                                                    deleteTag(e);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <input
                                        id="tags-input"
                                        type="text"
                                        onChange={e => {
                                            onChangeTagInput(e);
                                        }}
                                        value={tagInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="createNFT__right-form-collection">
                            <label>Collection</label>
                            <Select />
                        </div>
                        <div className="createNFT__right-form-category">
                            <label>Category</label>
                            <Select />
                        </div>
                        <div className="createNFT__right-form-description">
                            <label>Description</label>
                            <textarea></textarea>
                        </div>
                        <div class="createNFT__right-form-attributes">
                            <div className="createNFT__right-form-attributes-type">
                                <label>Type</label>
                                <Select />
                            </div>
                            <div className="createNFT__right-form-attributes-price">
                                <label>Price</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="createNFT__right-form-royalties">
                            <label>Royalties</label>
                            <RangeSlider />
                        </div>
                        <div className="createNFT__right-form-buttons">
                            <input className="createNFT__right-form-buttons-create" type="button" value="CREATE NFT" />
                            <input
                                className={`createNFT__right-form-buttons-reset ${changeTheme(
                                    "",
                                    "createNFT__right-form-buttons-reset--dark",
                                )}`}
                                type="button"
                                value="RESET"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            />
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default CreateNFT;
