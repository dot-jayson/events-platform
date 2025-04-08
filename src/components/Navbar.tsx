import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, role, logout, authLoading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Left links */}
      <div className="flex space-x-4">
        <Link
          to="/"
          className="text-lg font-semibold text-blue-600 hover:text-blue-400"
        >
          Home
        </Link>

        {user && role === 'staff' && (
          <Link
            to="/create-event"
            className="text-lg font-semibold text-blue-600 hover:text-blue-400"
          >
            Create Event
          </Link>
        )}
      </div>
      {/* Right side */}
      <div className="flex items-center space-x-4">
        {!authLoading && user ? (
          <>
            <span className="text-gray-600 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1  text-red-400 rounded
             text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className="text-sm text-blue-600 hover:text-blue-400"
            >
              Login / Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
