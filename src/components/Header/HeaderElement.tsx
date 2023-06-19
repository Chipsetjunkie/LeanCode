import React, { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserAuthenticationModal from "../Modals/UseraAuthenticationModal/UserAuthenticationModelElement";
import {toast} from "react-toastify"


export default function HeaderElement() {
    const [showModal, setShowModal] = useState(false);
    const { user, signOut } = useCurrentUser();

    function handleSignout(){
        signOut()
        toast.success("Logout Successfully!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
        });
    }

    return (
        <div className="bg-black w-full flex-1 h-[60px] flex flex-col justify-center">
            <div className="mx-4 flex justify-between items-center">
                <p>LeanCode</p>
                <button
                    className="p-1 w-[80px] text-black font-bold bg-brand-orange rounded"
                    onClick={() => {
                        user ? handleSignout(): setShowModal(true);
                    }}
                >
                    {user ? "Logout" : "Sign In"}
                </button>
            </div>

            <div>
                <UserAuthenticationModal
                    show={showModal}
                    closeModal={() => setShowModal(false)}
                />
            </div>
        </div>
    );
}
