'use client'

import { useAppStore } from '@microfrontends/zustand-store'

export function Counter() {
  const { count, increment, decrement } = useAppStore()

  return (
    <div className="flex items-center gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
      <button
        onClick={decrement}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        --
      </button>
      <span className="text-xl font-bold">{count}</span>
      <button
        onClick={increment}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        +++
      </button>
    </div>
  )
} 