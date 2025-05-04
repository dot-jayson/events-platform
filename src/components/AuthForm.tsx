import { useState } from 'react'
import { auth, db } from '../lib/firebase'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('Logged in successfully')
        setEmail('')
        setPassword('')
        navigate('/')
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = userCredential.user
        console.log('Account created')
        navigate('/')

        // Create user profile in Firestore (no role)
        await setDoc(doc(db, 'users', user.uid), {
          email,
          first_name: firstName,
          last_name: lastName,
          myEvents: [], // Initialize the myEvents field as an empty array
        })

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {!isLogin && (
          <>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <label
              htmlFor="lastName"
              className="block text-sm font-medium"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </>
        )}

        <label
          htmlFor="password"
          className="block text-sm font-medium"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          {loading ? 'Submitting...' : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center mt-4">
        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="text-blue-600 underline"
        >
          {isLogin ? 'Create an account' : 'Login instead'}
        </button>
      </div>
    </div>
  )
}

export default AuthForm
