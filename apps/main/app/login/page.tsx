import { Page, Text } from '@vercel/examples-ui'
import { Navbar } from '@acme/components/navbar'
import LoginForm from './components/LoginForm'

export default function LoginPage(): React.ReactNode {
  return (
    <Page>
      <Navbar />
      <Text variant="h1" className="mb-6">
        Login
      </Text>
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </Page>
  )
} 