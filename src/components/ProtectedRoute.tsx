import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, authLoading } = useAuth()

  //   Wait for firebase to finish initialising auth state first
  if (authLoading) return null

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
