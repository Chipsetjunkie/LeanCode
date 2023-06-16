import React from 'react'
import jumpGame from '@/dataStore/problems/jumpGame'

//icons
import {
    AiFillLike,
    AiFillDislike,
    AiOutlineLoading3Quarters,
    AiFillStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

const DIFFICULTY_COLOR = {
    "easy": "bg-olive text-olive",
    "medium": "bg-dark-yellow text-dark-yellow",
    "hard": "bg-dark-pink text-dark-pink"
}


interface ProblemDescriptionProps {
    completed?: boolean
    liked?: boolean
    unliked?: boolean
    starred?: boolean
}

export default function ProblemDescription(props: ProblemDescriptionProps) {

    const { completed, liked, unliked, starred } = props;

    return (
        <div className='text-white'>
            <div className='bg-dark-layer-2 flex h-10 pt-3 items-start' >     
                <p className='bg-[#282828] p-3 pt-1 rounded-t text-[12px]'> Description</p>
                
            </div>
            <div className='p-4'>
                {/* Problem title */}
                <div>
                    <div className="flex space-x-4">
                        <div className="flex-1 mr-2 text-lg text-white font-medium">
                            <p> {jumpGame.position}. {jumpGame.title}</p>
                        </div>
                    </div>
                    <div className='flex mt-3'>
                        <p className={`${DIFFICULTY_COLOR[jumpGame.difficulty as "medium"]} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}>{jumpGame.difficulty}</p>
                        <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'> < AiFillLike className={liked ? "text-dark-blue-s" : ""} /></div>
                        <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'> < AiFillDislike className={unliked ? "text-dark-blue-s" : ""} /></div>
                        <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'> {starred ? < AiFillStar className={"text-dark-yellow"} /> : <TiStarOutline />}</div>
                    </div>

                </div>
                {/* Problem Statement */}
                <div className='my-6'>
                    <div
                        dangerouslySetInnerHTML={{ __html: jumpGame.problemStatement }}
                    />
                </div>
                {/* Problem Examples */}
                <div>
                    {
                        jumpGame.examples.map((example, index) => (
                            <div key={example.id}>
                                <p className="font-medium text-white">Example {index + 1}:</p>
                                {/* {example.img && (
                            <Image
                                className="my-6"
                                src={example.img}
                                alt="image"
                                width={450}
                                height={450}
                            />
                        )} */}
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
                        ))
                    }
                </div>
                {/* Problem Constraints */}
                <div className="my-5">
                    <div className="text-white text-sm font-medium">Constraints:</div>
                    <ul className="text-white ml-5 list-disc">
                        <div
                            dangerouslySetInnerHTML={{ __html: jumpGame.constraints }}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}
