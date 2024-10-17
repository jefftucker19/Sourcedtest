import React, { useState } from 'react'
import { X, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Candidate {
  id: number
  name: string
  stage: string
}

interface Job {
  id: number
  title: string
  department: string
  status: string
  date: string
  description: string
  requirements: string[]
  candidates: Candidate[]
}

interface JobDetailsProps {
  job: Job
  onClose: () => void
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose }) => {
  const [showCandidates, setShowCandidates] = useState(false)

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div className="mb-4">
        <span className={`px-2 py-1 text-sm font-semibold rounded-full ${
          job.status === 'Open' ? 'bg-green-100 text-green-800' :
          job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {job.status}
        </span>
      </div>
      <div className="flex justify-between mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${showCandidates ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
          onClick={() => setShowCandidates(false)}
        >
          Job Details
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${showCandidates ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowCandidates(true)}
        >
          Candidates ({job.candidates.length})
        </button>
      </div>
      {!showCandidates ? (
        <div>
          <p className="text-gray-600 mb-4">{job.description}</p>
          <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc list-inside mb-4">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">Posted on: {job.date}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Candidates:</h3>
          {job.candidates.length > 0 ? (
            <ul className="space-y-2">
              {job.candidates.map((candidate) => (
                <li key={candidate.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <div>
                    <p className="font-semibold">{candidate.name}</p>
                    <p className="text-sm text-gray-600">Stage: {candidate.stage}</p>
                  </div>
                  <Link to={`/candidates/${candidate.id}`} className="text-blue-600 hover:text-blue-800">
                    <ChevronRight size={20} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No candidates yet for this job.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default JobDetails