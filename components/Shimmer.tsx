import React from 'react'

const Shimmer = () => {
  return (
    <div className="ml-auto w-full max-w-sm rounded-md border border-dough-500 p-4 mb-4">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-32 rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-2 rounded bg-gray-200"></div>
              <div className="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div className="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shimmer
