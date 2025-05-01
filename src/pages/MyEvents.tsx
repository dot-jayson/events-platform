import { useEffect, useState } from 'react'
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Event } from '../types/Event'
import { useAuth } from '../context/AuthContext'
import SingleEventCard from '../components/SingleEventCard'

const MyEvents = () => {
  const { user } = useAuth()
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [eventCount, setEventCount] = useState(0)

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!user) {
        setMyEvents([])
        setEventCount(0)
        return
      }

      setLoading(true)

      try {
        // Get event IDs from user doc
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          setMyEvents([])
          setEventCount(0)
          return
        }

        const eventIds: string[] = userSnap.data().myEvents || []
        if (eventIds.length === 0) {
          setMyEvents([])
          setEventCount(0)
          return
        }

        const eventsRef = collection(db, 'events')

        // Firestore 'in' query supports up to 10 items at a time
        const chunks = []
        for (let i = 0; i < eventIds.length; i += 10) {
          chunks.push(eventIds.slice(i, i + 10))
        }

        const allDocs: Event[] = []

        for (const chunk of chunks) {
          const q = query(eventsRef, where('__name__', 'in', chunk))
          const snapshot = await getDocs(q)
          snapshot.forEach((doc) => {
            allDocs.push({ id: doc.id, ...doc.data() } as Event)
          })
        }

        const now = new Date()

        const upcomingEvents = allDocs
          .filter((event) => new Date(event.date.toDate()) >= now)
          .sort(
            (a, b) =>
              new Date(a.date.toDate()).getTime() -
              new Date(b.date.toDate()).getTime()
          )

        setMyEvents(upcomingEvents)
        setEventCount(upcomingEvents.length)
      } catch (err) {
        console.error('Error fetching my events:', err)
        setMyEvents([])
        setEventCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchMyEvents()
  }, [user])

  if (loading) return <p className="text-center mt-8">Loading your events...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">My Events</h1>
      <p className="text-gray-600 mb-4">
        You have signed up for <strong>{eventCount}</strong> / 5 upcoming events
      </p>

      {myEvents.length === 0 ? (
        <p>You haven't signed up for any upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {myEvents.map((event) => (
            <SingleEventCard
              key={event.id}
              event={event}
              isMyEventView
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEvents
