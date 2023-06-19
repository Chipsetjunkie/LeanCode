import React, { useState } from 'react'
import { toast } from "react-toastify"
import useSignUpUser from '@/hooks/useSignUpUser'

//api
import { updateUser } from '@/helpers/api'

interface LoginScreenProps {
    changeMode: (x: boolean) => void
    closeModal: () => void
}

export default function SignUpScreen(props: LoginScreenProps) {

    const { createUserWithEmailAndPassword } = useSignUpUser()
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        username: "",
        password: ""
    })


    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loginDetails.email || !loginDetails.password) return alert("fill all the details");
        try {
            toast.loading("Creating your account", {
                position: "top-center",
                toastId: "loadingtoast",
            });
            const newUser = await createUserWithEmailAndPassword(
                loginDetails.email,
                loginDetails.password
            );


            if (!newUser) return;
            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: loginDetails.username,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            };

            await updateUser(newUser.user.uid, userData)

        } catch (err: any) {
            toast.error(err.message, {
                position: "top-center",
            });
        } finally {
            toast.dismiss("loadingtoast");
        }
    };

    return (
        <div className="bg-[#001220] flex flex-col justify-center items-center  rounded h-[400px] w-[300px]">
            <div>
                <p className="text-[#3DE6AF] text-[30px]"> Signup </p>
            </div>
            <form onSubmit={handleSignUp}>
                <label htmlFor="email" className="invisible">
                    Email
                </label>
                <br />
                <input
                    placeholder="Email"
                    onChange={(e) => setLoginDetails(prev => ({ ...prev, email: e.target.value }))}
                    className="border text-white border-[#276087] text-sm placeholder-[#276087] bg-[#082336] p-2 rounded"
                    type="email"
                    id="email"
                    value={loginDetails.email}
                />
                <br />
                <label htmlFor="username" className="invisible">
                    Username
                </label>
                <br />
                <input
                    placeholder="Username"
                    onChange={(e) => setLoginDetails(prev => ({ ...prev, username: e.target.value }))}
                    className="border text-white  border-[#276087] text-sm placeholder-[#276087] bg-[#082336] p-2 rounded"
                    type="text"
                    id="username"
                    value={loginDetails.username}
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
                    onChange={(e) => setLoginDetails(prev => ({ ...prev, password: e.target.value }))}
                    className="text-white  text-sm  placeholder-[#276087] text-[#276087] border border-[#276087] bg-[#082336] p-2 rounded"
                    value={loginDetails.password}
                />
                <br />
                <div>
                    <p className="text-sm text-white opacity-60 mt-4 ml-[35px]">
                        Already have a account?
                        <span
                            className="font-bold cursor-pointer border-b  ml-1 border-[#3DE6AF]"
                            onClick={() =>
                                props.changeMode(false)
                            }
                        >
                            Login
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
    )
}
