import React from 'react'
import ProblemsListElement from '@/components/ProblemsList/ProblemsListElement'

// import { seedDatabase,deleteDocument } from '@/utils/seed'

export default function Index() {

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
      <ProblemsListElement />
    </div>
  )
}
