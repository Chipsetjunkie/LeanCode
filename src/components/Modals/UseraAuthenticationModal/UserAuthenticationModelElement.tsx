import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import useHasMounted from "@/hooks/useHasMounted";

function UserModal({ closeModal }: any) {
    const [formDetails, setFormDetails] = useState({
        isSigningUp: false,
    });

    return (
        <div className="transition ease-in-out duration-1000 absolute w-full  h-full flex justify-center items-center">
            <div className="absolute w-full bg-[rgb(0,0,0,0.8)] h-full" onClick={closeModal} />
            <div className="z-[1]">
                {formDetails.isSigningUp ? (
                    <SignUpScreen
                        changeMode={(state) => setFormDetails({ isSigningUp: state })}
                        closeModal={closeModal}
                    />
                ) : (
                    <LoginScreen
                        changeMode={(state) => setFormDetails({ isSigningUp: state })}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </div>

    );
}

export default function UserAuthenticationModal({ show, closeModal }: any) {
    const hasMounted = useHasMounted()


    const Modal = show ? <UserModal closeModal={closeModal} /> : null
    const element = document?.getElementById('login-modal-root')
    if (hasMounted && element) {
        return createPortal(
            Modal,
            element
        )
    } else {
        return null
    }

}