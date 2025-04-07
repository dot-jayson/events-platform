import { mockEvents } from '../mock/mockEvents'
import SingleEventCard from '../components/SingleEventCard'

const EventList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {mockEvents.map((singleEvent) => (
        <SingleEventCard
          key={singleEvent.id}
          event={singleEvent}
        />
      ))}
    </div>
  )
}

export default EventList
