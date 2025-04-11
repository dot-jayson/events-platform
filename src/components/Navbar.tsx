import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const { user, role, logout, authLoading } = useAuth()
  const navigate = useNavigate()
  // To check current path
  const location = useLocation()
  const isOnAuthPage = location.pathname === '/auth'

  // Mobile menu toggle state
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => setMenuOpen(!menuOpen)

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Left Logo */}
      <div>
        <h1 className="text-2xl font-semibold">
          Events <span className="text-blue-600 font-bold">Platform</span>
        </h1>
      </div>

      {/* Hamburger Icon (mobile) */}
      <div className="block md:hidden">
        <button
          onClick={handleMenuToggle}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop view */}
      {/* Mid links */}
      <div className="hidden md:flex space-x-4 items-center">
        {!isOnAuthPage && (
          <Link
            to="/"
            className="text-lg font-semibold text-blue-600 hover:text-blue-400"
          >
            Home
          </Link>
        )}

        {user && !isOnAuthPage && (
          <Link
            to="/my-events"
            className="text-lg font-semibold text-blue-600 hover:text-blue-400"
          >
            My Events
          </Link>
        )}

        {user && role === 'staff' && !isOnAuthPage && (
          <Link
            to="/create-event"
            className="text-lg font-semibold text-blue-600 hover:text-blue-400"
          >
            Create Event
          </Link>
        )}
      </div>

      {/* Right side */}
      <div className="hidden md:flex space-x-4 items-center">
        {!authLoading && user && (
          <>
            <span className="text-gray-600 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4">
          {!authLoading && user && (
            <span className="text-gray-600 text-sm font-semibold">
              Welcome {user.email}
            </span>
          )}

          {!isOnAuthPage && (
            <Link
              to="/"
              className="text-lg font-semibold text-blue-600 hover:text-blue-400"
              onClick={() => setMenuOpen(false)} // Close menu when link is clicked
            >
              Home
            </Link>
          )}

          {user && !isOnAuthPage && (
            <Link
              to="/my-events"
              className="text-lg font-semibold text-blue-600 hover:text-blue-400"
              onClick={() => setMenuOpen(false)} // Close menu when link is clicked
            >
              My Events
            </Link>
          )}

          {user && role === 'staff' && !isOnAuthPage && (
            <Link
              to="/create-event"
              className="text-lg font-semibold text-blue-600 hover:text-blue-400"
              onClick={() => setMenuOpen(false)} // Close menu when link is clicked
            >
              Create Event
            </Link>
          )}

          {!authLoading && user && (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-md text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
