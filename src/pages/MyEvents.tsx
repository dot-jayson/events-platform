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
  const [myEventIds, setMyEventIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 8

  useEffect(() => {
    const fetchMyEventIds = async () => {
      if (!user) return
      try {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          const userData = userSnap.data()
          const eventIds: string[] = userData.myEvents || []
          setMyEventIds(eventIds)
        }
      } catch (err) {
        console.error('Error fetching my event IDs:', err)
      }
    }

    fetchMyEventIds()
  }, [user])

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!user || myEventIds.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const eventsRef = collection(db, 'events')
        const startIndex = (currentPage - 1) * eventsPerPage
        const endIndex = startIndex + eventsPerPage
        const currentEventIds = myEventIds.slice(startIndex, endIndex)

        if (currentEventIds.length === 0) {
          setMyEvents([])
          setLoading(false)
          return
        }

        const q = query(eventsRef, where('__name__', 'in', currentEventIds))

        const querySnap = await getDocs(q)
        const events: Event[] = []

        querySnap.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() } as Event)
        })

        setMyEvents(events)
      } catch (err) {
        console.error('Error fetching my events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyEvents()
  }, [user, myEventIds, currentPage])

  if (loading) return <p className="text-center mt-8">Loading your events...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {myEvents.length === 0 ? (
        <p>You haven't signed up for any events yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {myEvents.map((myEvent) => (
              <SingleEventCard
                key={myEvent.id}
                event={myEvent}
                isMyEventView
              />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex flex-col items-center mt-4 gap-2">
            {/* Page Indicator */}
            <span className="text-gray-600">
              Page {currentPage} of{' '}
              {Math.ceil(myEventIds.length / eventsPerPage)}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * eventsPerPage >= myEventIds.length}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MyEvents
