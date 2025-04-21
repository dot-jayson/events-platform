import { Timestamp } from 'firebase/firestore'

export interface Event {
  id: string
  title: string
  date: Timestamp
  description: string
  location: string
  imageURL: string
  attendees: string[]
  createdBy: string
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
