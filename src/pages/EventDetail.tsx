import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Event } from '../types/Event'
import { useAuth } from '../context/AuthContext'

const EventDetail = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [isSignedUp, setIsSignedUp] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventId) return
        const docRef = doc(db, 'events', eventId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const eventData = {
            id: docSnap.id,
            ...docSnap.data(),
          } as Event
          setEvent(eventData)
        } else {
          console.log('No such document!')
        }
      } catch (err) {
        console.error('Error fetching event:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [eventId])

  useEffect(() => {
    const checkIfSignedUp = async () => {
      if (!user || !eventId) return

      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()
        const signedUp = userData.myEvents?.includes(eventId)
        setIsSignedUp(signedUp)
      }
    }

    checkIfSignedUp()
  }, [user, eventId])

  const handleSignUp = async () => {
    if (!user || !event) return
    try {
      // Add eventId to myEvents field in users document
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        myEvents: arrayUnion(event.id),
      })

      // Add userId to attendees field in events document
      const eventRef = doc(db, 'events', event.id)
      await updateDoc(eventRef, {
        attendees: arrayUnion(user.uid),
      })

      setIsSignedUp(true)
    } catch (err) {
      console.error('Sign up error:', err)
      alert('Failed to sign up. Please try again.')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!event) return <p>Event not found.</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={event.imageURL}
        alt={event.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-2">{event.date.toDate().toDateString()}</p>
      <p className="text-gray-800 mb-2">{event.location}</p>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <button
        disabled={isSignedUp}
        className={`mt-4 w-full py-2 px-4 rounded-full 
            ${
              isSignedUp
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }
            text-white focus:outline-none focus:ring-2 focus:ring-opacity-50`}
        onClick={handleSignUp}
      >
        {isSignedUp ? "You're Signed Up!" : 'Sign Up'}
      </button>
    </div>
  )
}

export default EventDetail
