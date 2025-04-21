import { useNavigate } from 'react-router-dom'
import { Event, GoogleCalendarEvent } from '../types/Event'
import { useGoogleCalendar } from '../hooks/useGoogleCalendar'

interface SingleEventCardProps {
  event: Event
  isMyEventView?: boolean
}

const SingleEventCard: React.FC<SingleEventCardProps> = ({
  event,
  isMyEventView,
}) => {
  const navigate = useNavigate()
  const formattedDate = event.date.toDate().toLocaleDateString()
  const { signInAndAddEvent } = useGoogleCalendar()

  const handleAddToCalendar = () => {
    const start = event.date.toDate()
    const end = new Date(start.getTime() + 60 * 60 * 1000) // One hour default to event for now

    // Create the calendar event object directly
    const calendarEvent: GoogleCalendarEvent = {
      summary: event.title,
      description: event.description,
      location: event.location,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    }

    // Pass the calendar event directly to Google Calendar integration
    signInAndAddEvent(calendarEvent)
  }

  const handleClick = () => {
    if (isMyEventView) {
      handleAddToCalendar()
    } else {
      navigate(`/events/${event.id}`)
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
      {/* Image Section */}
      <img
        src={event.imageURL}
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        <p className="text-gray-700 text-sm mt-1">{event.description}</p>

        <div className="mt-4 text-gray-600 text-sm">
          <p>{event.location}</p>
          <p>{formattedDate}</p>
        </div>

        {/* See More Button */}
        <button
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleClick}
        >
          {isMyEventView ? 'Add to Calendar' : 'See More'}
        </button>
      </div>
    </div>
  )
}

export default SingleEventCard
