import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EventList from './pages/EventList'
import CreateEvent from './pages/CreateEvent'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import StaffOnlyRoute from './components/StaffOnlyRoute'
import EventDetail from './pages/EventDetail'
import MyEvents from './pages/MyEvents'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <EventList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth"
            element={<Auth />}
          />

          <Route
            path="/events/:eventId"
            element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="create-event"
            element={
              <StaffOnlyRoute>
                <CreateEvent />
              </StaffOnlyRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
