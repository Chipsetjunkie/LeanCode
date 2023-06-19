import React from 'react'
import Playground from '@/components/Playground/PlaygroundElement'

import ProblemMaps from "@/dataStore/problems";



type ProblemKeysTypes = keyof typeof ProblemMaps;

export default function Sandbox(props: any) {
    return (
        <div><Playground Problem={props.Problem} /></div>
    )
}


export async function getStaticPaths() {
    const paths = Object.keys(ProblemMaps).map(item => ({ params: { id: item } }))

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps(context: any) {
    const Problem = ProblemMaps[context.params.id as ProblemKeysTypes]

    if (!Problem) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            Problem
        },
    };
}

