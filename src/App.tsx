import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EventList from './pages/EventList'
import CreateEvent from './pages/CreateEvent'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<EventList />}
          />
          <Route
            path="/auth"
            element={<Auth />}
          />
          <Route
            path="create-event"
            element={<CreateEvent />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
