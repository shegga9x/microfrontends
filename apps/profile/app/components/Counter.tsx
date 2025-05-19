'use client'

import { useStore } from '@acme/shared'

export function Counter() {
  const { count, increment, decrement, reset } = useStore()
  
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Docs App Counter</h2>
      <div className="flex items-center gap-4">
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-red-500 black rounded hover:bg-red-600"
        >
          Decrement
      </button>
        <span className="text-2xl font-bold">{count}</span>
        <button 
          onClick={increment}
          className="px-4 py-2 bg-green-500 black rounded hover:bg-green-600"
        >
          Increment
        </button>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-gray-500 black rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
} 