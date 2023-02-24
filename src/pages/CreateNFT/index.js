import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import "./CreateNFT.scss";
import Select from "../../components/Select";
import RangeSlider from "../../components/RangeSlider";
import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function CreateNFT() {
    const { changeTheme, theme } = useContext(ContextApp);

    // CREATE SINGLE NFT
    const [files, setFiles] = useState(""); // Photo
    const [filename, setFilename] = useState("");
    const [attrs, setAttrs] = useState([{ id: 1, name: "", value: "", setName(arg) { this.name = arg }, setValue(arg) { this.value = arg}}]); // Attributes

    const [nameNFT, setNameNFT] = useState(""); // Display Name
    const [tags, setTags] = useState(["Example"]); // Tags
    const [tagInput, setTagInput] = useState("");
    const [collectionNFT, setCollectionNFT] = useState("") // Collection
    const [categoryNFT, setCategoryNFT] = useState(""); // Category
    const [description, setDescription] = useState(""); // Description
    const [typeNFT, setTypeNFT] = useState(""); // Type
    const [priceNFT, setPriceNFT] = useState(); // Price 
    const [royalties, setRoyalties] = useState(0); // Royalties
    

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

    function deleteAttr(id) {
        let attrs_new = [];
        attrs.map(attr => attr.id == Number(id) ? null : attrs_new.push(attr))
        setAttrs(attrs_new);
    }

    // сбрасывает все поля до дефолтных значений
    const resetEnters = () => {
        setNameNFT("");
        setTags(["Example"]);
        setCollectionNFT("");
        setCategoryNFT("");
        setDescription("");
        setTypeNFT("");
        setPriceNFT("");
        document.getElementById("slider-popa").value = "100";
    }

    const validationEnters = () => {
        if(nameNFT !== "" && collectionNFT !== "" && categoryNFT !== "" && typeNFT !== "" && priceNFT !== "") {
            return true
        } else {
            return false
        }
    }

    // возвращает все НФТ
    const seeNFTs = () => {
        axios
            .post(
                "https://nft-one.art/api/nfts/list",
                {
                },
                {
                    headers: {
                        Token: localStorage.getItem("adminToken"),
                    },
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log("Ошибка при выводе NFTs:", error);
            });
    }

    // создает НФТ
    const createNFT = () => {
        if(validationEnters()) {
            toast.success("NFT created", {
                position: "bottom-right",
                style: {
                    font: "400 21px/100% 'DM Sans'"
                },
            })
            resetEnters();
            // axios
        //     .post(
        //         "https://nft-one.art/api/nfts/upsert",
        //         {
        //             items: [
        //                 {
        //                     name: nameNFT,
        //                     price: priceNFT,
        //                     info: description
        //                 }
        //             ]
        //         },
        //         {
        //             headers: {
        //                 Token: localStorage.getItem("tonhubToken") ? localStorage.getItem("tonhubToken") : localStorage.getItem("tonkeeperToken"),
        //             },
        //             auth: {
        //                 username: "odmen",
        //                 password: "NFTflsy",
        //             },
        //         },
        //     )
        //     .then(response => {
        //         console.log("NFT успешно создана, его данные:", response.data)
        //     })
        //     .catch(error => {
        //         console.log("Ошибка при создании NFT:", error);
        //     });
        } else {
            toast.error("Check the data", {
                position: "bottom-right",
                style: {
                    font: "400 21px/100% 'DM Sans'"
                },
            })
        }
    }

    // удаляет НФТ
    const deleteNFT = (id) => {
        axios
            .post(
                "https://nft-one.art/api/nfts/delete",
                {
                    "ids": [
                        id
                    ]
                },
                {
                    headers: {
                        Token: localStorage.getItem("adminToken"),
                    },
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                console.log("Удаление NFT прошло успешно")
            })
            .catch(error => {
                console.log("Ошибка при удалении NFT:", error);
            });
    }

    return (
        <>
            <Header />
            <section
                className={`createNFT ${changeTheme("", "createNFT--dark")}`}
                style={{ backgroundColor: changeTheme("#fff", "#15191E") }}>
                <Toaster/>
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
                                            <input type="text" placeholder={`${!index ? "Price" : ""}`}/>
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
                                            <input type="text" placeholder={`${!index ? "Price" : ""}`} onChange={(e) => item.setName(e.target.value)} />
                                        ))}
                                    </div>
                                    <div className="createNFT__left-attr-box-value">
                                        <label>Value</label>
                                        {attrs.map((item, index) => (
                                            <div>
                                            <input type="text" placeholder={`${!index ? "10$" : ""}`} onChange={(e) => item.setValue(e.target.value)}/>
                                            {
                                                index !== 0 && (
                                                    <div data-attrid={item.id} className="createNFT__left-attr-box-value-minus" onClick={(e) => deleteAttr(e.target.getAttribute('data-attrid'))}></div>
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
                                setAttrs([...attrs, { id: attrs[attrs.length - 1].id + 1, name: "", value: "" }]);
                            }}>
                            + Add attribute
                        </button>
                    </div>
                </div>
                <div
                    className="createNFT__right"
                    style={{
                        backgroundColor: changeTheme("#f4f6f9", "#1C2026"),
                        borderColor: changeTheme("#efefef", "#1c2026"),
                        color: changeTheme("#000", "#fff"),
                    }}>
                    <h1 className="createNFT__right-title">Create single nft</h1>
                    <form className="createNFT__right-form" action="">
                        <div className="createNFT__right-form-name">
                            <label>Display Name*</label>
                            <input type="text" placeholder="NFT name" value={nameNFT} onChange={(e) => setNameNFT(e.target.value)}/>
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
                            <label>Collection*</label>
                            <Select
                                values={["No collection"]}
                                value={collectionNFT}
                                setValue={(arg) => setCollectionNFT(arg)}
                            />
                        </div>
                        <div className="createNFT__right-form-category">
                            <label>Category*</label>
                            <Select
                                values={["Art", "Collectibles", "Music", "Photography", "Sports", "Trading", "Cards", "Utility", "Virtual", "Worlds"]}
                                value={categoryNFT}
                                setValue={(arg) => setCategoryNFT(arg)}
                            />
                        </div>
                        <div className="createNFT__right-form-description">
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="createNFT__right-form-attributes">
                            <div className="createNFT__right-form-attributes-type">
                                <label>Type*</label>
                                <Select values={["Auction", "Sell"]} value={typeNFT} setValue={arg => setTypeNFT(arg)}/>
                            </div>
                            <div className="createNFT__right-form-attributes-price">
                                <label>Price*</label>
                                <input type="number" min="0" value={priceNFT} onChange={(e) => setPriceNFT(e.target.value)} />
                            </div>
                        </div>
                        <div className="createNFT__right-form-royalties">
                            <label>Royalties</label>
                            <RangeSlider setValue={(val) => setRoyalties(val)} />
                        </div>
                        <div className="createNFT__right-form-buttons">
                            <input className="createNFT__right-form-buttons-create" type="button" onClick={createNFT} value="CREATE NFT" />
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