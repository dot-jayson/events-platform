import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface StaffOnlyRouteProps {
  children: React.ReactNode
}

const StaffOnlyRoute = ({ children }: StaffOnlyRouteProps) => {
  const { user, role, authLoading } = useAuth()

  if (authLoading) return null

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    )
  }

  if (role !== 'staff') {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return <>{children}</>
}

export default StaffOnlyRoute
