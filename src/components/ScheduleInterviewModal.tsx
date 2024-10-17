import React, { useState } from 'react'
import { X, Calendar } from 'lucide-react'

interface Candidate {
  id: number
  name: string
  position: string
}

interface ScheduleInterviewModalProps {
  candidate: Candidate
  onClose: () => void
}

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({ candidate, onClose }) => {
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the interview details to an API
    console.log('Scheduling interview for:', candidate.name)
    console.log('Date:', interviewDate)
    console.log('Time:', interviewTime)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Schedule Interview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-1">
              Candidate
            </label>
            <input
              type="text"
              id="candidateName"
              value={`${candidate.name} - ${candidate.position}`}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-1">
              Interview Date
            </label>
            <input
              type="date"
              id="interviewDate"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="interviewTime" className="block text-sm font-medium text-gray-700 mb-1">
              Interview Time
            </label>
            <input
              type="time"
              id="interviewTime"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleInterviewModal