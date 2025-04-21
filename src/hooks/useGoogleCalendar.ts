import { useEffect, useState } from 'react'
import { GoogleCalendarEvent } from '../types/Event'

const SCOPES = 'https://www.googleapis.com/auth/calendar.events'
const DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export const useGoogleCalendar = () => {
  const [gapiReady, setGapiReady] = useState(false)
  const [tokenClient, setTokenClient] =
    useState<google.accounts.oauth2.TokenClient | null>(null)

  useEffect(() => {
    const initializeGapi = async () => {
      // Load gapi
      function gapiLoaded() {
        gapi.load('client', async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          })
          setGapiReady(true)
        })
      }

      //   Set up token client
      function gisLoaded() {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: () => {},
        })
        setTokenClient(client)
      }

      if (window.gapi && window.gapi) {
        gapiLoaded()
        gisLoaded()
      }
    }
    initializeGapi()
  }, [])

  const signInAndAddEvent = async (calendarEvent: GoogleCalendarEvent) => {
    if (!tokenClient) return

    tokenClient.callback = async (resp) => {
      if (resp.error) {
        console.error('Token error', resp)
        return
      }

      try {
        const result = await gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: {
            summary: calendarEvent.summary,
            description: calendarEvent.description,
            location: calendarEvent.location,
            start: {
              dateTime: calendarEvent.start.dateTime,
              timeZone: calendarEvent.start.timeZone,
            },
            end: {
              dateTime: calendarEvent.end.dateTime,
              timeZone: calendarEvent.end.timeZone,
            },
          },
        })
        console.log('Event created:', result)
        alert('Event added to your Google Calendar!')
      } catch (error) {
        console.error('Error creating event:', error)
      }
    }

    tokenClient.requestAccessToken()
  }

  return { signInAndAddEvent, gapiReady }
}
