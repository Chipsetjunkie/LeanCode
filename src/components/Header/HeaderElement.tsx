import React, { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserAuthenticationModal from "../Modals/UseraAuthenticationModal/UserAuthenticationModelElement";
import { toast } from "react-toastify"
import { useRouter } from "next/router";

import { BiArrowBack } from "react-icons/bi"
import useHasMounted from "@/hooks/useHasMounted";
import { useSetRecoilState } from "recoil";
import { userStore } from "@/global/store";

interface HeaderProps {
    styleUpdate?: string
    back?: boolean
}

export default function HeaderElement({ styleUpdate = "bg-black h-[60px]", back }: HeaderProps) {
    const [showModal, setShowModal] = useState(false);
    const setCurrentUser = useSetRecoilState(userStore)
    const hasMounted = useHasMounted()
    const { user, signOut } = useCurrentUser();
    const router = useRouter()

    function handleSignout() {
        signOut()
        setCurrentUser({ currentUser: null })
        toast.success("Logout Successfully!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
        });
    }

    if (!hasMounted) return null

    return (
        <div className={`w-full flex-1  flex flex-col justify-center ${styleUpdate}`}>
            <div className="mx-4 flex justify-between items-center">
                <div> {back ? <BiArrowBack onClick={() => router.back()} className="text-white cursor-pointer" /> : <p>LeanCode</p>}</div>
                {user && <span> Welcome back, {user.displayName} </span>}
                <button
                    className="p-1 w-[80px] text-black font-bold bg-brand-orange rounded"
                    onClick={() => {
                        user ? handleSignout() : setShowModal(true);
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
