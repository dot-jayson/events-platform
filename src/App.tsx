import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EventList from './pages/EventList'
import CreateEvent from './pages/CreateEvent'
import Auth from './pages/Auth'

function App() {
  return (
    <Router>
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
  )
}

export default App
