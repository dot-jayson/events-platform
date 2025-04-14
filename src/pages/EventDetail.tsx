import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Event } from '../types/Event'

const EventDetail = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

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
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
        onClick={() => alert('Sign up functionality')}
      >
        Sign Up
      </button>
    </div>
  )
}

export default EventDetail
