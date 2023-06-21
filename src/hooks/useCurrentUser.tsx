//TODO: Troubleshoot why display name not showing up

import { useRecoilValue } from "recoil"
import { userStore } from "@/global/store"
import { handleLogout } from "@/helpers/api"


export default function useCurrentUser() {
    const { currentUser } = useRecoilValue(userStore)
    return { user: currentUser, signOut: () => handleLogout() }
}
