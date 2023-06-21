import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProblemType } from "@/types/problemSchema";
import { toast } from "react-toastify";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "@/firebase/setup";
import RectangleSkeleton from "../Skeleton/RectangleSkeleton";

//icons
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserType, userStore } from "@/global/store";
import { useSetRecoilState } from "recoil";
import { handleUserUpdate } from "@/helpers/api";

const DIFFICULTY_COLOR = {
    easy: "bg-olive text-olive",
    medium: "bg-dark-yellow text-dark-yellow",
    hard: "bg-dark-pink text-dark-pink",
};

interface ProblemDescriptionProps {
    problem: ProblemType;
    completed: boolean;
}

const STARRED = "starred";
const LIKED = "liked";
const DISLIKED = "disliked";

type clickHandlerInput = "starred" | "liked" | "disliked";

function getUpdatedState(state: any, type: clickHandlerInput) {
    switch (type) {
        case STARRED:
            return { ...state, starred: !state.starred };
        case LIKED:
            return {
                ...state,
                liked: !state.liked,
                disliked: !state.liked ? false : state.disliked,
            };
        case DISLIKED:
            return {
                ...state,
                disliked: !state.disliked,
                liked: !state.disliked ? false : state.liked,
            };
    }
}

export default function ProblemDescription(props: ProblemDescriptionProps) {
    const { user } = useCurrentUser();
    const hasCompletedRef = useRef(false);
    const setCurrentUser = useSetRecoilState(userStore)

    const { problem, completed } = props;
    const [loading, setLoading] = useState(true);
    const [userPreferences, setUserPreference] = useState({
        liked: false,
        disliked: false,
        starred: false,
        completed: false,
    });

    const { liked, disliked, starred } = userPreferences;

    const jumpGame = problem.description;
    const position = problem.position;

    async function updateUserPreference(type: clickHandlerInput) {
        const updatedState = getUpdatedState({ ...userPreferences }, type);
        const userData = user as UserType
        let likedProblems = userData.likedProblems
        let dislikedProblems = userData.dislikedProblems
        let starredProblems = userData.starredProblems
        if (type !== "starred") {
            likedProblems = !updatedState.liked
                ? likedProblems.filter(
                    (id: string) => id !== problem.description.id
                )
                : [...likedProblems, problem.description.id];

            dislikedProblems = !updatedState.disliked
                ? dislikedProblems.filter(
                    (id: string) => id !== problem.description.id
                )
                : [...dislikedProblems, problem.description.id];

        } else {
            starredProblems = !updatedState.starred
                ? starredProblems.filter(
                    (id: string) => id !== problem.description.id
                )
                : [...starredProblems, problem.description.id];


        }

        const updatedCurrentUser = {
            ...user as UserType,
            likedProblems,
            starredProblems,
            dislikedProblems
        }
        handleUserUpdate(updatedCurrentUser)
        setCurrentUser({
            currentUser: updatedCurrentUser
        })

        setUserPreference({ ...updatedState });


    }

    async function markProblemCompleted() {
        const solvedProblems = (user as UserType).solvedProblems;
        if (!solvedProblems.includes(problem.description.id)) {
            const updatedSolvedProblems = [...solvedProblems, problem.description.id]
            const updatedUserDetails = {
                ...user as UserType,
                solvedProblems: updatedSolvedProblems
            }
            handleUserUpdate(updatedUserDetails)
            setCurrentUser({
                currentUser: updatedUserDetails
            })

            hasCompletedRef.current = true;
            setUserPreference(prev => ({
                ...prev,
                completed: true
            }))
        }

    }

    function clickHandler(type: clickHandlerInput) {
        if (user) {
            updateUserPreference(type);
        } else {
            return toast.error("Please login to continue!", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        }

    }

    async function updateInitialState() {

        const userData = user as UserType
        const liked = userData.likedProblems.includes(problem.description.id);
        const disliked = userData.dislikedProblems.includes(
            problem.description.id
        );
        const starred = userData.starredProblems.includes(problem.description.id);
        const completed = userData.solvedProblems.includes(
            problem.description.id
        );

        setUserPreference({
            liked,
            disliked,
            starred,
            completed,
        });
        setLoading(false);

    }

    useEffect(() => {
        if (user && completed && !hasCompletedRef.current) {
            console.log("marking cmpleted")
            markProblemCompleted();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completed]);

    useEffect(() => {
        console.log(user, "useri")
        if (user) {
            setLoading(true)
            updateInitialState();
        } else {
            setUserPreference({
                liked: false,
                disliked: false,
                starred: false,
                completed: false,
            });
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="text-white">
            <div className="bg-dark-layer-2 flex h-10 pt-3 items-start">
                <p className="bg-[#282828] p-3 pt-1 rounded-t text-[12px]">
                    Description
                </p>
            </div>
            <div className="p-4">
                {/* Problem title */}
                <div>
                    <div className="flex space-x-4">
                        <div className="flex-1 mr-2 text-lg text-white font-medium">
                            <p>
                                {position}. {jumpGame.title}
                            </p>
                        </div>
                    </div>
                    {!loading ? (
                        <div className="flex mt-3">
                            {userPreferences.completed && (
                                <div className="items-center justify-center flex mr-3">
                                    <BsCheck2Circle className="text-olive" />
                                </div>
                            )}
                            <p
                                className={`${DIFFICULTY_COLOR[jumpGame.difficulty as "medium"]
                                    } inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
                            >
                                {jumpGame.difficulty}
                            </p>
                            <div
                                onClick={() => clickHandler(LIKED)}
                                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                            >
                                <AiFillLike className={liked ? "text-dark-blue-s" : ""} />
                            </div>
                            <div
                                onClick={() => clickHandler(DISLIKED)}
                                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                            >
                                <AiFillDislike className={disliked ? "text-dark-blue-s" : ""} />
                            </div>
                            <div
                                onClick={() => clickHandler(STARRED)}
                                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                            >
                                {starred ? (
                                    <AiFillStar className={"text-dark-yellow"} />
                                ) : (
                                    <TiStarOutline />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-1/2 mt-2">
                            <RectangleSkeleton />{" "}
                        </div>
                    )}
                </div>
                {/* Problem Statement */}
                <div className="my-6">
                    <div
                        dangerouslySetInnerHTML={{ __html: jumpGame.problemStatement }}
                    />
                </div>
                {/* Problem Examples */}
                <div>
                    {jumpGame.examples.map((example, index) => (
                        <div key={example.id}>
                            <p className="font-medium text-white">Example {index + 1}:</p>
                            {example.img && (
                                <Image
                                    className="my-6"
                                    src={example.img}
                                    alt="image"
                                    width={450}
                                    height={450}
                                />
                            )}
                            <div className="example-card">
                                <pre className="text-white">
                                    <strong className="text-white">Input: </strong>
                                    {example.inputText}
                                    <br />
                                    <strong>Output:</strong> {example.outputText} <br />
                                    <strong>Explanation:</strong>
                                    {example.explanation}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Problem Constraints */}
                <div className="my-5">
                    <div className="text-white text-sm font-medium">Constraints:</div>
                    <ul className="text-white ml-5 list-disc">
                        <div dangerouslySetInnerHTML={{ __html: jumpGame.constraints }} />
                    </ul>
                </div>
            </div>
        </div>
    );
}
