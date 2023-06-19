import React, { useState } from "react";
import { toast } from "react-toastify";

import useSignInUser from "@/hooks/useSignIn";

interface LoginScreenProps {
    changeMode: (x: boolean) => void;
    closeModal: () => void;
}

export default function LoginScreen(props: LoginScreenProps) {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const { signInWithEmailAndPassword, error } = useSignInUser();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!loginDetails.email || !loginDetails.password)
                return alert("Please fill all fields");
            const loggedInUser = await signInWithEmailAndPassword(
                loginDetails.email,
                loginDetails.password
            )
            if (error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            } else if (!loggedInUser) {
                toast.error("Sign in Failed", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            } else {
                toast.success("logged In", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
                props.closeModal();
            }

        } catch (err: any) {
            toast.error(err.message, {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };
    return (
        <div className="bg-[#001220] text-white flex flex-col justify-center items-center p-4 rounded h-[400px] w-[300px]">
            <div>
                <p className="text-[#3DE6AF] text-[30px]"> Login </p>
            </div>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email" className="invisible">
                    Email
                </label>
                <br />
                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="border border-[#276087] text-sm placeholder-[#276087] bg-[#082336] p-2 rounded"
                    type="email"
                    id="email"
                    value={loginDetails.email}
                />
                <br />
                <label htmlFor="password" className="invisible">
                    Password
                </label>
                <br />
                <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={(e) =>
                        setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className=" text-sm  placeholder-[#276087] text-[#276087] border border-[#276087] bg-[#082336] p-2 rounded"
                    value={loginDetails.password}
                />
                <br />
                <div>
                    <p className="text-sm opacity-60 text-white mt-4 ml-[80px]">
                        Not registered?
                        <span
                            className="font-bold cursor-pointer border-b  ml-1 border-[#3DE6AF]"
                            onClick={() => props.changeMode(true)}
                        >
                            Signup
                        </span>
                    </p>
                </div>
                <button
                    type="submit"
                    className="Login mt-8 bg-[#3DE6AF] text-[#001220] font-bold w-[100px] py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
