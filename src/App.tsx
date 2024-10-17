import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import JobRequests from './pages/JobRequests'
import JobDetail from './pages/JobDetail'
import Candidates from './pages/Candidates'
import CandidateProfile from './pages/CandidateProfile'
import CandidateEdit from './pages/CandidateEdit'
import CandidateOffer from './pages/CandidateOffer'
import ScheduleInterview from './pages/ScheduleInterview'
import Interviews from './pages/Interviews'
import Communication from './pages/Communication'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Menu } from 'lucide-react'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/job-requests" element={<JobRequests />} />
              <Route path="/job-requests/:id" element={<JobDetail />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/candidates/:id" element={<CandidateProfile />} />
              <Route path="/candidates/:id/edit" element={<CandidateEdit />} />
              <Route path="/candidates/:id/offer" element={<CandidateOffer />} />
              <Route path="/candidates/:id/schedule-interview" element={<ScheduleInterview />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App