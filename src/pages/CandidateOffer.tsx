import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, Calendar, FileText } from 'lucide-react'

// Mock function to get candidate data (replace with actual API call)
const getCandidateData = (id: string) => {
  // This would be an API call in a real application
  return Promise.resolve({
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    salary: 120000,
    billRate: 75,
  })
}

const CandidateOffer: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState({
    name: '',
    position: '',
    salary: 0,
    billRate: 0,
  })
  const [offerDetails, setOfferDetails] = useState({
    salary: 0,
    startDate: '',
    notes: '',
  })

  useEffect(() => {
    getCandidateData(id!).then(data => {
      setCandidate(data)
      setOfferDetails(prev => ({ ...prev, salary: data.salary }))
    })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOfferDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the offer
    console.log('Offer submitted:', { candidateId: id, ...offerDetails })
    navigate(`/candidates/${id}`)
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
      <h1 className="text-3xl font-bold mb-6">Make an Offer to {candidate.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Offer Salary</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              id="salary"
              name="salary"
              value={offerDetails.salary}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={offerDetails.startDate}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Offer Notes</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
              <FileText size={18} className="text-gray-400" />
            </div>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={offerDetails.notes}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Additional details about the offer..."
            ></textarea>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  )
}

export default CandidateOffer