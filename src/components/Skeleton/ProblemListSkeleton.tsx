import React from 'react'
import RectangleSkeleton from './RectangleSkeleton'

export default function ProblemListSkeleton() {
    return (
        <div className="bg-[#0C0B10] text-white flex flex-col  items-center flex-1 h-[100vh]">
            <div className="bg-black w-full h-[60px]" />
            <table className="w-3/4 mt-[100px] bg-[#191B1F] ">
                <thead>
                    <tr>
                        <th className="py-4 text-sm">NAME</th>
                        <th className="py-4 text-sm">CATEGORY</th>
                        <th className="py-4 text-sm">DIFFICULTY</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(10)].map((item, index) => (
                        <tr key={`skeleton-${index}`} className="bg-[#111317] border-b-[4px] border-[#0C0B10]">
                            <td>
                                <div className="p-2 px-4">
                                    <RectangleSkeleton />
                                </div>
                            </td>
                            <td >
                                <div className="p-3 px-4">
                                    <RectangleSkeleton />
                                </div>
                            </td>
                            <td>
                                <div className="p-2 px-4">
                                    <RectangleSkeleton />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
