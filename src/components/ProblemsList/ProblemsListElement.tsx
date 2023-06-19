import React, { useEffect } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ProblemListSkeleton from "../Skeleton/ProblemListSkeleton";
import { toast } from "react-toastify";

import { app } from "@/firebase/setup";
import useHasMounted from "@/hooks/useHasMounted";
import HeaderElement from "../Header/HeaderElement";

type DifficultType = "easy" | "medium" | "hard"

export default function ProblemsListElement() {
  const hasMounted = useHasMounted();
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "ProblemList")
  );


  const difficulty = {
    easy: "text-olive",
    medium: " text-dark-yellow",
    hard: " text-dark-pink",
  };

  if (!hasMounted) return null;
  if (loading) {
    return <ProblemListSkeleton />
  }
  else {
    return (
      <div className="bg-[#0C0B10] text-white flex flex-col  items-center flex-1 h-[100vh]">
        <div className="w-full">
          <HeaderElement />
        </div>
        <table className="w-3/4 mt-[100px] bg-[#191B1F] ">
          <thead>
            <tr>
              <th className="py-4 text-sm">NAME</th>
              <th className="py-4 text-sm">CATEGORY</th>
              <th className="py-4 text-sm">DIFFICULTY</th>
            </tr>
          </thead>
          <tbody>
            {value?.docs?.map((doc: any) => (
              <tr key={doc.id} className="bg-[#111317] border-b-[4px] border-[#0C0B10]">
                <td className="text-center text-sm py-4">{doc.data().title}</td>
                <td className="text-center text-sm py-4">
                  <code>{doc.data().category}</code>
                </td>
                <td
                  className={`text-center text-sm py-4 ${difficulty[doc.data().difficulty as DifficultType]} capitalize`}
                >
                  {doc.data().difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

