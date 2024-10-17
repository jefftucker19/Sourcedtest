import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MapPin, Briefcase, GraduationCap, Mail, Phone, Linkedin, Github, DollarSign, ArrowLeft, Send, FileText, User, FileText as Resume, ExternalLink, Calendar, ClipboardList } from 'lucide-react'
import AssessmentModal from '../components/AssessmentModal'

interface Candidate {
  id: number
  name: string
  position: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  salary?: number
  billRate?: number
  status: string
  experience: Array<{ position: string; company: string; duration: string; description: string }>
  education: Array<{ degree: string; institution: string; year: string }>
  skills: string[]
  resumeUrl: string
  assessments: Array<{ id: number; date: string; assessor: string; content: string }>
  notes: Array<{ id: number; date: string; author: string; content: string }>
}

// Mock data
const mockCandidateData: Candidate = {
  id: 1,
  name: "John Doe",
  position: "Software Engineer",
  location: "New York, NY",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "https://www.linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  salary: 120000,
  billRate: 75,
  status: "Interview",
  experience: [
    {
      position: "Senior Developer",
      company: "Tech Corp",
      duration: "2018 - Present",
      description: "Led development of cloud-based solutions."
    },
    {
      position: "Junior Developer",
      company: "Startup Inc",
      duration: "2015 - 2018",
      description: "Worked on frontend applications using React."
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Tech University",
      year: "2015"
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State College",
      year: "2013"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  resumeUrl: "https://example.com/johndoe-resume.pdf",
  assessments: [
    {
      id: 1,
      date: "2023-04-15",
      assessor: "Jane Smith",
      content: "Strong technical skills, good culture fit."
    }
  ],
  notes: [
    {
      id: 1,
      date: "2023-04-16",
      author: "Recruiter",
      content: "Candidate showed great enthusiasm during the initial call."
    }
  ]
}

const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'assessments'>('profile')

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // In a real app, you would fetch data based on the id
        // For now, we'll just use the mock data
        setCandidate(mockCandidateData)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch candidate data')
        setLoading(false)
      }
    }

    fetchCandidate()
  }, [id])

  const openAssessmentModal = () => {
    setIsAssessmentModalOpen(true)
  }

  const closeAssessmentModal = () => {
    setIsAssessmentModalOpen(false)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error || !candidate) {
    return <div className="flex justify-center items-center h-screen">Error: {error || 'Candidate not found'}</div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Candidates
      </button>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={`https://ui-avatars.com/api/?name=${candidate.name}&size=128`} alt={candidate.name} className="w-24 h-24 rounded-full mr-4" />
              <div>
                <h1 className="text-2xl font-bold">{candidate.name}</h1>
                <p className="text-gray-600">{candidate.position}</p>
                <p className="text-gray-500 flex items-center mt-1">
                  <MapPin size={16} className="mr-1" />
                  {candidate.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={openAssessmentModal}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-200"
              >
                <ClipboardList size={16} className="mr-2" />
                Add Assessment & Notes
              </button>
              <Link
                to={`/candidates/${candidate.id}/offer`}
                className="bg-green-100 text-green-600 px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-200"
              >
                <Send size={16} className="mr-2" />
                Make Offer
              </Link>
              <Link
                to={`/candidates/${candidate.id}/schedule-interview`}
                className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md flex items-center justify-center hover:bg-purple-200"
              >
                <Calendar size={16} className="mr-2" />
                Request Interview
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('assessments')}
                  className={`${
                    activeTab === 'assessments'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`}
                >
                  Assessments & Notes
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'profile' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">{candidate.email}</a>
                    </li>
                    <li className="flex items-center">
                      <Phone size={16} className="mr-2" />
                      <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">{candidate.phone}</a>
                    </li>
                    <li className="flex items-center">
                      <Linkedin size={16} className="mr-2" />
                      <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn Profile</a>
                    </li>
                    <li className="flex items-center">
                      <Github size={16} className="mr-2" />
                      <a href={candidate.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Profile</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Candidate Details</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <DollarSign size={16} className="mr-2" />
                      Salary Expectation: ${candidate.salary?.toLocaleString() ?? 'N/A'}
                    </li>
                    <li className="flex items-center">
                      <DollarSign size={16} className="mr-2" />
                      Bill Rate: ${candidate.billRate?.toLocaleString() ?? 'N/A'}/hr
                    </li>
                    <li className="flex items-center">
                      <User size={16} className="mr-2" />
                      Status: <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        candidate.status === 'Screening' ? 'bg-yellow-200 text-yellow-800' :
                        candidate.status === 'Interview' ? 'bg-blue-200 text-blue-800' :
                        'bg-green-200 text-green-800'
                      }`}>{candidate.status}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Experience</h2>
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
                    <p className="text-gray-600">{exp.duration}</p>
                    <p className="mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Education</h2>
                {candidate.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p>{edu.institution}, {edu.year}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Resume</h2>
                <a
                  href={candidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  <Resume size={16} className="mr-2" />
                  View Resume
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </>
          )}

          {activeTab === 'assessments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Assessments</h2>
              {candidate.assessments.map((assessment) => (
                <div key={assessment.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{assessment.assessor}</span>
                    <span className="text-sm text-gray-500">{assessment.date}</span>
                  </div>
                  <p>{assessment.content}</p>
                </div>
              ))}

              <h2 className="text-xl font-semibold mb-4 mt-8">Notes</h2>
              {candidate.notes.map((note) => (
                <div key={note.id} className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{note.author}</span>
                    <span className="text-sm text-gray-500">{note.date}</span>
                  </div>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isAssessmentModalOpen && (
        <AssessmentModal
          candidateId={candidate.id}
          candidateName={candidate.name}
          onClose={closeAssessmentModal}
          onSubmit={(newAssessment, newNote) => {
            // Here you would typically make an API call to save the new assessment and note
            // For now, we'll just update the local state
            setCandidate(prev => {
              if (!prev) return null
              return {
                ...prev,
                assessments: [...prev.assessments, { 
                  id: prev.assessments.length + 1, 
                  date: new Date().toISOString().split('T')[0],
                  assessor: 'Current User', // In a real app, this would be the logged-in user
                  content: newAssessment 
                }],
                notes: [...prev.notes, {
                  id: prev.notes.length + 1,
                  date: new Date().toISOString().split('T')[0],
                  author: 'Current User', // In a real app, this would be the logged-in user
                  content: newNote
                }]
              }
            })
            closeAssessmentModal()
          }}
        />
      )}
    </div>
  )
}

export default CandidateProfile