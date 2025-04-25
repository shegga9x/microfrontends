import { Navbar } from '@acme/components/navbar'
import { Page } from '@vercel/examples-ui'
import type { ReactNode } from 'react'

export default function Home(): ReactNode {
  return (
    <Page>
      <Navbar />
    </Page>
  )
}
