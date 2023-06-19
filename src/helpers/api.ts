import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/setup";


export const updateUser = (uid:string, userData: any) => {
    return setDoc(doc(db, "users", uid), userData);
}