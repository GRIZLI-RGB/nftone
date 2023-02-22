import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from "react-accessible-accordion";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ContextApp } from "../../Context";
import "./FAQ.scss";

function FAQ() {
    const [FAQs, setFAQs] = useState([
    ]);

    const { changeTheme } = useContext(ContextApp);

    useEffect(() => {
        document.getElementById("root").style.display = "grid";
        document.getElementById("root").style.gridTemplateRows = "auto 1fr auto";
        document.getElementById("root").style.minHeight = "100vh";
    }, []);

    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/faq/list",
                {},
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                setFAQs(response.data.items);
            })
            .catch(error => {
                console.log("Ошибка при получении FAQ:", error);
            });
    }, []);

    return (
        <>
            <Header currentPage={"faq"} />

            <section className="faq" style={{backgroundColor: changeTheme("#f4f6fa", "#15191E")}}>
                <div className="faq__box">
                    <h1 className="faq__box-title" style={{color: changeTheme("", "#fff")}}>Frequently Asked Questions</h1>
                    <Accordion className="faq__box-items" allowMultipleExpanded={true} allowZeroExpanded={true}>
                        {FAQs.map((faq, index) => {
                            return (
                                <AccordionItem className="faq__box-items-item">
                                    <AccordionItemHeading className="faq__box-items-item-question">
                                        <AccordionItemButton className={changeTheme("faq__box-items-item-question-btn", "faq__box-items-item-question-btn faq__box-items-item-question-btn--dark")}>
                                            {faq.name}
                                            <AccordionItemState>
                                                {expanded =>
                                                    expanded.expanded ? (
                                                        <img
                                                            src="./img/sections/faq/arrow-light.svg"
                                                            alt=""
                                                            style={{ transform: "rotate(180deg) translateY(50%)" }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="./img/sections/faq/arrow-light.svg"
                                                            alt=""
                                                            style={{ transform: "rotate(0deg) translateY(-50%)" }}
                                                        />
                                                    )
                                                }
                                            </AccordionItemState>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel className="faq__box-items-item-answer">
                                        {faq.info}
                                    </AccordionItemPanel>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default FAQ;