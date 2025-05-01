import SingleEventCard from '../components/SingleEventCard'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Event } from '../types/Event'

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 8

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'))
        const eventsData: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[]

        const now = new Date()

        const futureEvents = eventsData
          .filter((event) => {
            const eventDate = new Date(event.date.toDate())
            return eventDate >= now
          })
          .sort((a, b) => {
            const dateA = new Date(a.date.toDate())
            const dateB = new Date(b.date.toDate())
            return dateA.getTime() - dateB.getTime()
          })

        setEvents(futureEvents)
      } catch (e) {
        console.error('Error loading events: ', e)
        setError('Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)

  const totalPages = Math.ceil(events.length / eventsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  if (loading) {
    return <div>Loading events</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <div className="p-4">
      <p className="text-center">
        <span className="font-semibold">Note:</span> You can only sign up to 5
        upcoming events at a time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {currentEvents.map((singleEvent) => (
          <SingleEventCard
            key={singleEvent.id}
            event={singleEvent}
          />
        ))}
      </div>
      {/* Pagination buttons*/}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EventList
