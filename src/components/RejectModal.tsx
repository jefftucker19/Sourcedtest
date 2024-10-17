import React, { useState } from 'react'
import { X } from 'lucide-react'

interface RejectModalProps {
  onClose: () => void
  onReject: (reason: string, details: string) => void
}

const rejectionReasons = [
  "Not enough experience",
  "Skills mismatch",
  "Salary expectations too high",
  "Poor cultural fit",
  "Failed technical assessment",
  "Lack of required qualifications",
  "Position filled",
  "Other"
]

const RejectModal: React.FC<RejectModalProps> = ({ onClose, onReject }) => {
  const [selectedReason, setSelectedReason] = useState('')
  const [details, setDetails] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onReject(selectedReason, details)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Reject Candidate</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Reason for Rejection
            </label>
            <select
              id="rejectionReason"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              required
            >
              <option value="">Select a reason</option>
              {rejectionReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details
            </label>
            <textarea
              id="details"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide more context or specific feedback about the rejection..."
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
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RejectModal