import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "react-hot-toast";
import Checkbox from "../../components/Checkbox";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ContextApp } from "../../Context";
import "./CreateCollection.scss";
import $ from "jquery";

function CreateCollection() {
    const { changeTheme } = useContext(ContextApp);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const [filename, setFilename] = useState("");
    const [attrs, setAttrs] = useState([{ id: 1, name: "", value: "" }]);
    const [nameCollection, setNameCollection] = useState("");
    const [descriptionCollection, setDescriptionCollection] = useState("");
    const [categories, setCategories] = useState([]);
    const [socials, setSocials] = useState({
        vk: "",
        facebook: "",
        discord: "",
        instagram: "",
        reddit: "",
        telegram: "",
        "tik-tok": "",
        twitter: "",
        youtube: ""
    });

    const [currentUser, setCurrentUser] = useState({});
    const [configCategories, setConfigCategories] = useState([]);

    useEffect(() => {
        axios
                .post("https://nft-one.art/api/auth/current", {}, {
                    headers: {
                        Token: localStorage.getItem("tonhubToken") ? localStorage.getItem("tonhubToken") : localStorage.getItem("tonkeeperToken"),
                    },
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                })
                .then(response => {
                    setCurrentUser(response.data.user)
                })
                .catch(error => {
                    console.log(error);
                });
        axios
                .post("https://nft-one.art/api/config/get", {}, {
                    headers: {
                        Token: localStorage.getItem("tonhubToken") ? localStorage.getItem("tonhubToken") : localStorage.getItem("tonkeeperToken"),
                    },
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                })
                .then(response => {
                    setConfigCategories(response.data.defaults["nft_categories"].split("\n"))
                })
                .catch(error => {
                    console.log(error);
                });
    }, [])

    useEffect(() => {
        setFilename(acceptedFiles[0]?.path);
    }, [acceptedFiles]);

    const setAttrsChange = (e, type) => {
        let attrs_copy = [...attrs];
        if (type === "value") {
            attrs_copy.map(attr =>
                Number(e.target.getAttribute("data-attrid")) === attr.id ? (attr.value = e.target.value) : null,
            );
        } else {
            attrs_copy.map(attr =>
                Number(e.target.getAttribute("data-attrid")) === attr.id ? (attr.name = e.target.value) : null,
            );
        }
        setAttrs(attrs_copy);
    };

    const deleteAttr = id => {
        let attrs_copy = [];
        attrs.map(attr => (attr.id === Number(id) ? null : attrs_copy.push(attr)));
        setAttrs(attrs_copy);
    };

    const getFormatAttrsForBackend = () => {
        let new_attrs = {};
        attrs.map(attr => new_attrs[attr.name] = attr.value);
        return new_attrs;
    }

    const changeCategoriesArray = (e) => {
        let currentCategory = e.target.innerText;
        if (categories.includes(currentCategory)) {
            setCategories(categories.filter(cat => cat !== currentCategory));
        } else {
            setCategories([...categories, currentCategory]);
        }
    }

    const changeSocialObject = (e) => {
        let currentSocial = e.target.getAttribute("data-social");
        let socials_copy = {...socials};
        socials_copy[currentSocial] = e.target.value;
        setSocials(socials_copy);
    }

    const validationCreateCollection = () => {
        return (nameCollection !== "" && descriptionCollection !== "" && acceptedFiles.length !== 0)
    }

    const resetCreateCollection = () => {
        setFilename("");
        setAttrs([{ id: 1, name: "", value: "" }]);
        setNameCollection("");
        setDescriptionCollection("");
        setCategories([]);
        setSocials({
            vk: "",
            facebook: "",
            discord: "",
            instagram: "",
            reddit: "",
            telegram: "",
            "tik-tok": "",
            twitter: "",
            youtube: ""
        })
        $(".checkbox__input").prop("checked", false);
    }

    const createCollection = () => {
        if (validationCreateCollection()) {
            const formData = new FormData();
            formData.append("json_data", JSON.stringify({
                items: [{
                    img: "img-collection",
                    name: nameCollection,
                    info: descriptionCollection,
                    categories: categories,
                    social_links: socials,
                    attrs: getFormatAttrsForBackend(),
                }]
            }));
            formData.append("img-collection", acceptedFiles[0]);
            axios
                .post("https://nft-one.art/api/nft_collections/upsert", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Token: localStorage.getItem("tonhubToken") ? localStorage.getItem("tonhubToken") : localStorage.getItem("tonkeeperToken"),
                    },
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                })
                .then(response => {
                    toast.success(`Collection «${nameCollection}» created`, {
                        position: "bottom-right",
                        style: {
                            font: "400 21px/100% 'DM Sans'",
                        },
                    });
                    resetCreateCollection();
                })
                .catch(error => {
                    toast.error(`Server error: try later`, {
                        position: "bottom-right",
                        style: {
                            font: "400 21px/100% 'DM Sans'",
                        },
                    });
                });
        } else {
            toast.error(`Check the data`, {
                position: "bottom-right",
                style: {
                    font: "400 21px/100% 'DM Sans'",
                },
            });
        }
    }

    return (
        <>
            <Header />
            <section className={changeTheme("createCollection", "createCollection createCollection--dark")}>
                <div className="createCollection__left">
                    <div className="createCollection__left-download dropzone" {...getRootProps()}>
                        <img
                            className="createCollection__left-download-img"
                            src="./img/sections/createNFT/drag-and-drop.svg"
                            alt="Drag and drop"
                        />
                        {filename ? (
                            <p className="createCollection__left-download-drag">{filename}</p>
                        ) : (
                            <>
                                <p className="createCollection__left-download-drag">Drag and drop photos here</p>
                                <p className="createCollection__left-download-or">or</p>
                            </>
                        )}
                        <button className="createCollection__left-download-browse">
                            <input {...getInputProps()} type="file" onClick={e => e.stopPropagation()} />
                            Browse Files
                        </button>
                    </div>
                    <div className="createCollection__left-attr">
                        <h6 className="createCollection__left-attr-title">Attributes</h6>
                        <div className="createCollection__left-attr-box">
                            {window.innerWidth <= 768 ? (
                                attrs.map((item, index) => (
                                    <>
                                        <div className="createCollection__left-attr-box-name">
                                            <label>Name</label>
                                            <input type="text" placeholder={`${!index ? "Price" : ""}`} />
                                        </div>
                                        <div className="createCollection__left-attr-box-value">
                                            <label>Value</label>
                                            <div>
                                                <input type="text" placeholder={`${!index ? "10$" : ""}`} />
                                                {index !== 0 && (
                                                    <div
                                                        className="createCollection__left-attr-box-value-minus"
                                                        onClick={() => deleteAttr()}></div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <>
                                    <div className="createCollection__left-attr-box-name">
                                        <label>Name</label>
                                        {attrs.map((item, index) => (
                                            <input
                                                data-attrid={item.id}
                                                type="text"
                                                placeholder={`${!index ? "Price" : ""}`}
                                                value={item.name}
                                                onChange={e => setAttrsChange(e, "name")}
                                            />
                                        ))}
                                    </div>
                                    <div className="createCollection__left-attr-box-value">
                                        <label>Value</label>
                                        {attrs.map((item, index) => (
                                            <div>
                                                <input
                                                    data-attrid={item.id}
                                                    type="text"
                                                    placeholder={`${!index ? "10$" : ""}`}
                                                    value={item.value}
                                                    onChange={e => setAttrsChange(e, "value")}
                                                />
                                                {index !== 0 && (
                                                    <div
                                                        data-attrid={item.id}
                                                        className="createCollection__left-attr-box-value-minus"
                                                        onClick={e =>
                                                            deleteAttr(e.target.getAttribute("data-attrid"))
                                                        }></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            className="createCollection__left-attr-add"
                            onClick={() => {
                                setAttrs([...attrs, { id: attrs[attrs.length - 1].id + 1, name: "", value: "" }]);
                            }}>
                            + Add attribute
                        </button>
                    </div>
                </div>
                <div className="createCollection__right">
                    <h1 className="createCollection__right-title">Create collection</h1>
                    <form className="createCollection__right-form" action="">
                        <div className="createCollection__right-form-name">
                            <label>
                                Display Name<span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Collection name"
                                value={nameCollection}
                                onChange={e => setNameCollection(e.target.value)}
                            />
                        </div>
                        <div className="createCollection__right-form-description">
                            <label>
                                Description<span>*</span>
                            </label>
                            <textarea
                                value={descriptionCollection}
                                onChange={e => setDescriptionCollection(e.target.value)}
                                placeholder="Tell us more about your collection"></textarea>
                        </div>
                        <div className="createCollection__right-form-box">
                            <div className="createCollection__right-form-box-categories">
                                <label>Categories</label>
                                <div>
                                    {configCategories.map(category => <Checkbox text={category} onClick={e => changeCategoriesArray(e)}/>)}
                                </div>
                            </div>
                            <div className="createCollection__right-form-box-social">
                                <label>Social Links</label>
                                <ul>
                                    {[
                                        "vk",
                                        "facebook",
                                        "discord",
                                        "instagram",
                                        "reddit",
                                        "tg",
                                        "tik-tok",
                                        "twitter",
                                        "youtube",
                                    ].map((social, i) => (
                                        <li>
                                            <img src={`./img/sections/collection/social-icons/${social}.svg`} alt="" />
                                            <input
                                                value={socials[social]}
                                                onChange={e => changeSocialObject(e)}
                                                type="text"
                                                placeholder={
                                                    i === 0 || i === 1 || i === 3
                                                        ? "account-id"
                                                        : i === 2
                                                        ? "server-id"
                                                        : i === 4 || i === 5 || i === 6 || i === 7
                                                        ? "nickname"
                                                        : i === 8
                                                        ? "url-code"
                                                        : ""
                                                }
                                                data-social={social}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="createCollection__right-form-buttons">
                            <input
                                className="createCollection__right-form-buttons-create"
                                type="button"
                                value="CREATE COLLECTION"
                                onClick={createCollection}
                            />
                            <input
                                className="createCollection__right-form-buttons-reset"
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
            <Toaster/>
            <Footer />
        </>
    );
}

export default CreateCollection;
