import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Users, Briefcase, Calendar, ArrowLeft } from 'lucide-react'
import KanbanBoard from '../components/KanbanBoard'

interface Candidate {
  id: number
  name: string
  stage: string
  image: string
  location: string
  linkedin?: string
  github?: string
  rejectReason?: string
  rejectDetails?: string
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

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    // Fetch job details (replace with actual API call)
    const fetchJobDetails = async () => {
      // Simulating API call
      const mockJob: Job = {
        id: 1,
        title: 'Software Engineer',
        department: 'Engineering',
        status: 'Open',
        date: '2023-04-15',
        description: 'We are looking for a talented software engineer...',
        requirements: ['5+ years experience', 'Strong JavaScript skills', 'React expertise'],
        candidates: [
          { 
            id: 1, 
            name: 'John Doe', 
            stage: 'New Profiles',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            location: 'New York, NY',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe'
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            stage: 'Interview',
            image: 'https://randomuser.me/api/portraits/women/2.jpg',
            location: 'San Francisco, CA',
            linkedin: 'https://linkedin.com/in/janesmith'
          },
          { 
            id: 3, 
            name: 'Bob Johnson', 
            stage: 'Screening',
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
            location: 'Chicago, IL',
            github: 'https://github.com/bobjohnson'
          },
        ]
      }
      setJob(mockJob)
    }

    fetchJobDetails()
  }, [id])

  const handleDragEnd = (candidateId: number, newStage: string, rejectReason?: string, rejectDetails?: string) => {
    if (!job) return

    const updatedCandidates = job.candidates.map(candidate => 
      candidate.id === candidateId ? { ...candidate, stage: newStage, rejectReason, rejectDetails } : candidate
    )

    setJob({ ...job, candidates: updatedCandidates })

    // Here you would typically make an API call to update the candidate's stage
    console.log(`Moved candidate ${candidateId} to ${newStage}`)
    if (rejectReason) {
      console.log(`Reject reason: ${rejectReason}`)
      console.log(`Reject details: ${rejectDetails}`)
    }
  }

  if (!job) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Job Requests
      </button>
      <h1 className="text-3xl font-bold mb-6">{job.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-gray-600 mr-4">
              <Briefcase size={16} className="inline mr-1" />
              {job.department}
            </span>
            <span className="text-gray-600">
              <Calendar size={16} className="inline mr-1" />
              Posted on {job.date}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-sm ${
            job.status === 'Open' ? 'bg-green-200 text-green-800' :
            job.status === 'Closed' ? 'bg-red-200 text-red-800' :
            'bg-yellow-200 text-yellow-800'
          }`}>
            {job.status}
          </span>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p>{job.description}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Candidates</h2>
          <KanbanBoard candidates={job.candidates} onDragEnd={handleDragEnd} />
        </div>
      </div>
    </div>
  )
}

export default JobDetail