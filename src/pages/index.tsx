import React, { use, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Playground from '@/components/Playground/PlaygroundElement'
import ProblemsListElement from '@/components/ProblemsList/ProblemsListElement'
import equal from "deep-equal"

// import { seedDatabase,deleteDocument } from '@/utils/seed'

export default function Index() {
  useEffect(() => {
    console.log(equal({ "a": 1, "b": { "c": 1, "d": 4 } }, { "a": 1, "b": { "c": 1, "d": 4 } }), "status")

  }, [])

  return (
    <div>
      {/* <button onClick={() => {
        seedDatabase()
      }}>
        Seed Data
      </button>
      <button onClick={() => {
        deleteDocument()
      }}>
        Delete Data
      </button> */}
      {/* <ProblemsListElement /> */}
      <Playground />
      <ToastContainer />
    </div>
  )
}
