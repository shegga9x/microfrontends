'use client'

import Image from 'next/image'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative w-16 h-16 animate-bounce">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                className="rounded-full"
                priority
              />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 animate-fade-in">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in-delayed">
            Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  )
} 