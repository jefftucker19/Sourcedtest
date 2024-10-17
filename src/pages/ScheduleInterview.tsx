import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Users, Mail, Send, Plus, Trash2 } from 'lucide-react'

// Mock function to get candidate data (replace with actual API call)
const getCandidateData = (id: string) => {
  // This would be an API call in a real application
  return Promise.resolve({
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    email: 'john.doe@example.com',
  })
}

// Mock function to send calendar invite (replace with actual email/calendar API)
const sendCalendarInvite = (interviewDetails: any) => {
  // This would be an API call to an email service in a real application
  console.log('Sending calendar invite:', interviewDetails)
  return Promise.resolve({ success: true })
}

interface TimeSlot {
  date: string
  time: string
}

const ScheduleInterview: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState({ name: '', position: '', email: '' })
  const [interviewDetails, setInterviewDetails] = useState({
    timeSlots: [{ date: '', time: '' }] as TimeSlot[],
    interviewers: '',
    interviewerEmails: '',
    notes: '',
  })

  useEffect(() => {
    getCandidateData(id!).then(setCandidate)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInterviewDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleTimeSlotChange = (index: number, field: 'date' | 'time', value: string) => {
    const newTimeSlots = [...interviewDetails.timeSlots]
    newTimeSlots[index][field] = value
    setInterviewDetails(prev => ({ ...prev, timeSlots: newTimeSlots }))
  }

  const addTimeSlot = () => {
    setInterviewDetails(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { date: '', time: '' }]
    }))
  }

  const removeTimeSlot = (index: number) => {
    setInterviewDetails(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would typically make an API call to submit the interview schedule
      console.log('Interview scheduled:', { candidateId: id, ...interviewDetails })
      
      // Send calendar invite
      await sendCalendarInvite({
        ...interviewDetails,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
      })

      // Show success message (in a real app, you'd use a proper notification system)
      alert('Interview options sent to the candidate successfully!')

      navigate(`/job-requests/${id}`)
    } catch (error) {
      console.error('Failed to schedule interview:', error)
      alert('Failed to send interview options. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Schedule Interview for {candidate.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interview Time Slots</label>
          {interviewDetails.timeSlots.map((slot, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <div className="flex-grow">
                <input
                  type="date"
                  value={slot.date}
                  onChange={(e) => handleTimeSlotChange(index, 'date', e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex-grow">
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => handleTimeSlotChange(index, 'time', e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTimeSlot(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlot}
            className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus size={20} className="mr-1" />
            Add Time Slot
          </button>
        </div>
        <div>
          <label htmlFor="interviewers" className="block text-sm font-medium text-gray-700 mb-1">Interviewer Names</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="interviewers"
              name="interviewers"
              value={interviewDetails.interviewers}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter interviewer names"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="interviewerEmails" className="block text-sm font-medium text-gray-700 mb-1">Interviewer Emails</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="interviewerEmails"
              name="interviewerEmails"
              value={interviewDetails.interviewerEmails}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter interviewer emails (comma-separated)"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Interview Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={interviewDetails.notes}
            onChange={handleChange}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Any additional notes or instructions for the interview..."
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send size={18} className="mr-2" />
            Send Interview Options
          </button>
        </div>
      </form>
    </div>
  )
}

export default ScheduleInterview