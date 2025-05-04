import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { auth } from '../lib/firebase'
import {
  onAuthStateChanged,
  signOut,
  User,
  getIdTokenResult,
} from 'firebase/auth'

interface AuthContextType {
  user: User | null
  isStaff: boolean
  authLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isStaff, setIsStaff] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthLoading(true)
      if (firebaseUser) {
        const tokenResult = await getIdTokenResult(firebaseUser)
        const claims = tokenResult.claims
        setIsStaff(claims.staff === true)
        setUser(firebaseUser)
      } else {
        setIsStaff(false)
        setUser(null)
      }
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isStaff, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
