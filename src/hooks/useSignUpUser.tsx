import React from 'react'
import { auth } from '@/firebase/setup'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';


export default function useSignUpUser() {
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    return { createUserWithEmailAndPassword, user, loading, error }
}
