import './globals.css'
import { Layout } from '@acme/components/layout'

export const metadata = {
  title: 'Modern Social Platform',
  description: 'A modern social platform built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
