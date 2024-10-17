import React, { useState } from 'react'
import { X, Star } from 'lucide-react'

interface AssessmentModalProps {
  candidateId: number
  candidateName: string
  onClose: () => void
  onSubmit: (assessment: {
    content: string
    type: 'Interview Feedback' | 'Resume Feedback' | 'Technical Assessment' | 'General'
    rating: number
  }, note: {
    content: string
    type: 'Interview Note' | 'Resume Note' | 'General Note'
  }) => void
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ candidateId, candidateName, onClose, onSubmit }) => {
  const [assessment, setAssessment] = useState('')
  const [assessmentType, setAssessmentType] = useState<'Interview Feedback' | 'Resume Feedback' | 'Technical Assessment' | 'General'>('General')
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [noteType, setNoteType] = useState<'Interview Note' | 'Resume Note' | 'General Note'>('General Note')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(
      { content: assessment, type: assessmentType, rating },
      { content: note, type: noteType }
    )
  }

  const renderStarRating = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} cursor-pointer`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Assessment & Note</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="assessmentType" className="block text-sm font-medium text-gray-700 mb-1">
              Assessment Type
            </label>
            <select
              id="assessmentType"
              value={assessmentType}
              onChange={(e) => setAssessmentType(e.target.value as any)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Interview Feedback">Interview Feedback</option>
              <option value="Resume Feedback">Resume Feedback</option>
              <option value="Technical Assessment">Technical Assessment</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assessment" className="block text-sm font-medium text-gray-700 mb-1">
              Assessment
            </label>
            <textarea
              id="assessment"
              rows={3}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Enter your assessment of the candidate..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            {renderStarRating()}
          </div>
          <div className="mb-4">
            <label htmlFor="noteType" className="block text-sm font-medium text-gray-700 mb-1">
              Note Type
            </label>
            <select
              id="noteType"
              value={noteType}
              onChange={(e) => setNoteType(e.target.value as any)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Interview Note">Interview Note</option>
              <option value="Resume Note">Resume Note</option>
              <option value="General Note">General Note</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <textarea
              id="note"
              rows={3}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter any additional notes about the candidate..."
            ></textarea>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssessmentModal