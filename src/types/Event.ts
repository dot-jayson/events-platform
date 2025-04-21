import { Timestamp } from 'firebase/firestore'

export interface Event {
  id: string
  title: string
  description: string
  location: string
  imageURL: string
  attendees: string[]
  createdBy: string
  date: Timestamp
  startTime: Timestamp
  endTime: Timestamp
}

export interface GoogleCalendarEvent {
  summary: string
  description: string
  location: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
}
