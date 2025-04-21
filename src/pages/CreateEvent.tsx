import React, { useState } from 'react'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    const startDateTime = new Date(`${date}T${startTime}`)
    let endDateTime = new Date(`${date}T${endTime}`)

    // Check if the end time is earlier than the start time, adjust to the next day if needed
    if (endDateTime < startDateTime) {
      endDateTime = new Date(endDateTime.getTime() + 24 * 60 * 60 * 1000) // Add 1 day
    }

    const eventData = {
      title,
      description,
      location,
      imageURL,
      date: Timestamp.fromDate(new Date(date)),
      startTime: Timestamp.fromDate(startDateTime),
      endTime: Timestamp.fromDate(endDateTime),
      createdBy: user.uid,
      attendees: [],
    }

    try {
      await addDoc(collection(db, 'events'), eventData)
      setSuccessMessage('Event created successfully!')
      navigate('/')
    } catch (err) {
      console.error('Error creating event:', err)
      setErrorMessage('Failed to create event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Description"
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Location"
            required
          />
        </div>

        <div>
          <label
            htmlFor="imageURL"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Image URL"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Event'}
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
