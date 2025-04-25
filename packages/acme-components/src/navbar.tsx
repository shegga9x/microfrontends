import type { ReactNode } from 'react'

export function Navbar({ isDocsApp }: { isDocsApp?: boolean }): ReactNode {
  return isDocsApp ? (
    <ul className="inline-flex mb-4">
      <li>
        <a href="/">Home (Multi-Zones)</a>
      </li>
      <li className="ml-4">
        <a href="/docs">Docs</a>
      </li>
      <li className="ml-4">
        <a href="/docs/about">About Docs</a>
      </li>
      <li className="ml-4">
        <a href="/post">Posts</a>
      </li>
    </ul>
  ) : (
    <ul className="inline-flex mb-4">
      <li>
        <a href="/">Home</a>
      </li>
      <li className="ml-4">
        <a href="/about">About</a>
      </li>
      <li className="ml-4">
        <a href="/docs">Docs (Multi-Zones)</a>
      </li>
      <li className="ml-4">
        <a href="/post">Posts</a>
      </li>
    </ul>
  )
}
