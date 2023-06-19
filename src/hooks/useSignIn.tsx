import React from 'react'
import { auth } from '@/firebase/setup'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';


export default function useSignInUser() {
    const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

    return { signInWithEmailAndPassword, user, loading, error }
}
