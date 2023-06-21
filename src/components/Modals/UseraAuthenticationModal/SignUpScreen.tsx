import React, { useState } from 'react'
import { toast } from "react-toastify"
import { handleUserSignup } from '@/helpers/api'
import { useSetRecoilState } from "recoil"
import { userStore } from '@/global/store'


interface LoginScreenProps {
    changeMode: (x: boolean) => void
    closeModal: () => void
}

export default function SignUpScreen(props: LoginScreenProps) {
    const setCurrentUser = useSetRecoilState(userStore)
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        username: "",
        password: ""
    })


    const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loginDetails.email || !loginDetails.password || !loginDetails.username) return alert("fill all the details");

        const user = await handleUserSignup(loginDetails)
        setCurrentUser({
            currentUser: user
        })
        toast.success("User signed up successfully", {
            position: "top-center",
            theme: "dark"
        })
        props.closeModal()
    };

    return (
        <div className="bg-[#001220] flex flex-col justify-center items-center  rounded h-[400px] w-[300px]">
            <div>
                <p className="text-[#3DE6AF] text-[30px]"> Signup </p>
            </div>
            <form onSubmit={signUpUser}>
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
