import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import {
  FaHome,
  FaUserFriends,
  FaVideo,
  FaStore,
  FaGamepad,
} from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { AiFillMessage } from 'react-icons/ai'
import { CgMenuGridO } from 'react-icons/cg'

const inter = Inter({ subsets: ['latin'] })

// Utility Components
const NavIcon = ({
  icon,
  active = false,
}: {
  icon: React.ReactNode
  active?: boolean
}) => (
  <button
    className={`p-2 rounded-lg hover:bg-gray-100 relative ${
      active ? 'text-blue-600' : 'text-gray-600'
    }`}
  >
    {icon}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full" />
    )}
  </button>
)

const IconButton = ({ icon }: { icon: React.ReactNode }) => (
  <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
    {icon}
  </button>
)

const SidebarItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) => (
  <Link
    href="#"
    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100"
  >
    <div className="text-gray-600">{icon}</div>
    <span className="font-medium">{text}</span>
  </Link>
)

const ContactItem = ({ name, online }: { name: string; online?: boolean }) => (
  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
    <div className="relative">
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
    <span className="font-medium">{name}</span>
  </div>
)

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
          <div className="flex items-center justify-between h-14 px-4">
            {/* Left Section */}
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-blue-600">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  priority
                />
              </Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Middle Section - Navigation Icons */}
            <div className="flex items-center justify-center flex-1 space-x-2">
              <NavIcon icon={<FaHome size={22} />} active />
              <NavIcon icon={<FaUserFriends size={22} />} />
              <NavIcon icon={<FaVideo size={22} />} />
              <NavIcon icon={<FaStore size={22} />} />
              <NavIcon icon={<FaGamepad size={22} />} />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              <IconButton icon={<CgMenuGridO size={22} />} />
              <IconButton icon={<AiFillMessage size={22} />} />
              <IconButton icon={<IoNotifications size={22} />} />
            </div>
          </div>
        </nav>

        <main className="w-full">
          <div className="w-full">{children}</div>
        </main>

        {/* Main Content */}
        {/* <div className="flex pt-14">
      <aside className="fixed left-0 w-[300px] h-[calc(100vh-56px)] p-4 overflow-y-auto hidden lg:block">
        <div className="space-y-2">
          <SidebarItem icon={<FaUserFriends size={20} />} text="Friends" />
          <SidebarItem icon={<FaStore size={20} />} text="Marketplace" />
          <SidebarItem icon={<FaVideo size={20} />} text="Watch" />
          <SidebarItem icon={<FaGamepad size={20} />} text="Gaming" />
        </div>
      </aside>

      <main className="flex-1 min-h-screen bg-gray-100 lg:ml-[300px]">
        <div className="max-w-2xl mx-auto p-4">
          {children}
        </div>
      </main>

      <aside className="fixed right-0 w-[300px] h-[calc(100vh-56px)] p-4 overflow-y-auto hidden xl:block">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-500">Contacts</h3>
          <ContactItem name="John Doe" online />
          <ContactItem name="Jane Smith" />
          <ContactItem name="Mike Johnson" online />
        </div>
      </aside>
    </div> */}
      </body>
    </html>
  )
}
