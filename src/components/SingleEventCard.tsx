import { useNavigate } from 'react-router-dom'
import { Event } from '../types/Event'
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
  const { signInAndAddEvent } = useGoogleCalendar()

  const handleAddToCalendar = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const googleEvent = {
      summary: event.title,
      description: event.description,
      location: event.location,
      start: {
        dateTime: event.startTime.toDate().toISOString(),
        timeZone,
      },
      end: {
        dateTime: event.endTime.toDate().toISOString(),
        timeZone,
      },
    }

    signInAndAddEvent(googleEvent)
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
          <p>
            {event.startTime.toDate().toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}{' '}
            {event.startTime.toDate().toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}{' '}
            –{' '}
            {event.endTime.toDate().toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
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
