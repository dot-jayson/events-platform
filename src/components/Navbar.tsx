import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const { user, role, logout, authLoading } = useAuth()
  const navigate = useNavigate()
  // To check current path
  const location = useLocation()
  const isOnAuthPage = location.pathname === '/auth'

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <nav className="bg-white shadow p-4 flex items-center">
      {/* Left Logo */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">
          Events <span className="text-blue-600 font-bold">Platform</span>
        </h1>
      </div>

      {/* Mid links */}
      <div className="flex space-x-4 justify-center">
        {!isOnAuthPage && (
          <Link
            to="/"
            className="text-lg font-semibold text-blue-600 hover:text-blue-400"
          >
            Home
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
      <div className="flex-1 flex justify-end items-center space-x-4">
        {!authLoading && user ? (
          <>
            <span className="text-gray-600 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-red-400 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          !isOnAuthPage && (
            <Link
              to="/auth"
              className="text-sm text-blue-600 hover:text-blue-400"
            >
              Login / Signup
            </Link>
          )
        )}
      </div>
    </nav>
  )
}

export default Navbar
