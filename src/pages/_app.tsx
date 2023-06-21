import "@/styles/globals.css";
import type { AppProps } from "next/app";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { userStore } from "@/global/store";

function HasMountedComponent() {
  const setCurrentUser = useSetRecoilState(userStore)
  useEffect(() => {
    const currentUserId = sessionStorage.getItem("current-user")
    const users = JSON.parse(localStorage.getItem("users") ?? "{}")
    const currentUser = users[currentUserId as string] || null
    setCurrentUser({
      currentUser
    })
  }, [])
  return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <HasMountedComponent />
        <Component {...pageProps} />
        <ToastContainer />
      </RecoilRoot>
    </>
  );
}
