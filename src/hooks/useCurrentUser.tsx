//TODO: Troubleshoot why display name not showing up

import { useEffect } from 'react'
import { auth } from "@/firebase/setup";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export default function useCurrentUser() {
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        console.log(user)
    }, [user])

    return { user, loading, error, signOut: () => signOut(auth) }
}
