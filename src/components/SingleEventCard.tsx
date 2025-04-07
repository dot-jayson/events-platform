import { Event } from '../types/Event'

interface SingleEventCard {
  event: Event
}

const SingleEventCard: React.FC<SingleEventCard> = ({ event }) => {
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
          <p>{event.date}</p>
        </div>

        {/* Add to Calendar Button */}
        <button
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => alert('Add to Calendar functionality here!')}
        >
          Add to Calendar
        </button>
      </div>
    </div>
  )
}

export default SingleEventCard
