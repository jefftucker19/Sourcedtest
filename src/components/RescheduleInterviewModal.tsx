import React, { useState } from 'react'
import { X } from 'lucide-react'

interface Interview {
  id: number
  candidate: string
  position: string
  date: string
  time: string
}

interface RescheduleInterviewModalProps {
  interview: Interview
  onClose: () => void
  onSubmit: (newDate: string, newTime: string) => void
}

const RescheduleInterviewModal: React.FC<RescheduleInterviewModalProps> = ({ interview, onClose, onSubmit }) => {
  const [newDate, setNewDate] = useState(interview.date)
  const [newTime, setNewTime] = useState(interview.time)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newDate, newTime)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Reschedule Interview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">New Date</label>
            <input
              type="date"
              id="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">New Time</label>
            <input
              type="time"
              id="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RescheduleInterviewModal