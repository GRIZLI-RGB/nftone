import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ConfirmEmail.scss";

function ConfirmEmail() {
    const [params, setParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    
    // useEffect(() => {
    //     axios
    //         .post(
    //             "https://nft-one.art/api/auth/current",
    //             {
    //             },
    //             {
    //                 headers: {
    //                     Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
    //                 },
    //                 auth: {
    //                     username: "odmen",
    //                     password: "NFTflsy",
    //                 },
    //             },
    //         )
    //         .then(response => {
    //             setCurrentUser(response.data.user)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, [])

    useEffect(() => {
            axios
              .post(
                  "https://nft-one.art/api/auth/confirm_email",
                  {
                    id: params.get("id"),
                    code: params.get("code")
                  },
                  {
                      headers: {
                          Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
                      },
                      auth: {
                          username: "odmen",
                          password: "NFTflsy",
                      },
                  },
              )
              .then(response => {
                  console.log(response.data)
                  setLoading(false);
              })
              .catch(error => {
                  console.log(error);
              });
    }, [])

    return (
        <section className="confirmEmail">
            {loading ? (
                <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        class="path"
                        fill="none"
                        stroke-width="6"
                        stroke-linecap="round"
                        cx="33"
                        cy="33"
                        r="30"></circle>
                </svg>
            ) : (
              <div>
                <p>Your email has been successfully confirmed!</p>
                <a href="/my-nft">Back to Profile</a>
              </div>
            )}
        </section>
    );
}

export default ConfirmEmail;
