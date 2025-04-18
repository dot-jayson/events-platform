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

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!user) return
      try {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        // Store event ids from user events
        if (userSnap.exists()) {
          const userData = userSnap.data()
          const myEventIds: string[] = userData.myEvents || []

          // If user has no events
          if (myEventIds.length === 0) {
            setMyEvents([])
            return
          }

          // Fetch the events with query using myEventIds
          const eventsRef = collection(db, 'events')
          const q = query(
            eventsRef,
            where('__name__', 'in', myEventIds.slice(0, 10))
          )

          const querySnap = await getDocs(q)
          const events: Event[] = []

          querySnap.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() } as Event)
          })
          setMyEvents(events)
        }
      } catch (err) {
        console.error('Error fetching my events:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMyEvents()
  }, [user])

  if (loading) return <p className="text-center mt-8">Loading your events...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {myEvents.length === 0 ? (
        <p>You haven't signed up for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {myEvents.map((myEvent) => (
            <SingleEventCard
              key={myEvent.id}
              event={myEvent}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEvents
