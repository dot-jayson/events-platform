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
