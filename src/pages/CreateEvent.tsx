import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const CreateEvent = () => {
  const { user, role, authLoading } = useAuth()
  // Loading state
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [imageURL, setImageURL] = useState('')

  if (authLoading) {
    return <div>Loading...</div> // Auth loading state
  }

  if (!user) {
    return <Navigate to="/auth" /> // Redirect if not authenticated
  }

  if (role !== 'staff') {
    return <div>You do not have permission to create events.</div> // Message for users trying to add events
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate an API call or data processing delay
    setTimeout(() => {
      console.log({ title, description, date, location, imageURL })

      // Reset form
      setTitle('')
      setDescription('')
      setDate('')
      setLocation('')
      setImageURL('')

      // Reset loading state after submission
      setLoading(false)
    }, 2000) // Simulating a delay of 2 seconds (replace with actual API call)
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create New Event
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <label
          htmlFor="title"
          className="block text-sm font-medium"
        >
          Event Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label
          htmlFor="date"
          className="block text-sm font-medium"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          placeholder="Date and time"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label
          htmlFor="location"
          className="block text-sm font-medium"
        >
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {/* Image, change to file selector later on */}
        <label
          htmlFor="image"
          className="block text-sm font-medium"
        >
          Image
        </label>
        <input
          id="image"
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white 
            rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? <span>Submitting...</span> : <span>Create Event</span>}
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
