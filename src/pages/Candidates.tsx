import React, { useState, useMemo } from 'react'
import { Search, Upload, MapPin, Briefcase, GraduationCap, DollarSign, ArrowUpDown, Eye, Calendar, MessageSquare } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ScheduleInterviewModal from '../components/ScheduleInterviewModal'

interface Candidate {
  id: number
  name: string
  position: string
  salary: number
  billRate: number
  status: string
  image: string
}

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    salary: 120000,
    billRate: 75,
    status: "Interview",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Product Manager",
    salary: 130000,
    billRate: 85,
    status: "Screening",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "Bob Johnson",
    position: "UX Designer",
    salary: 110000,
    billRate: 70,
    status: "Offer",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  }
]

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
  const navigate = useNavigate()

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate =>
      (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       candidate.position.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === null || candidate.status === filterStatus)
    )
  }, [candidates, searchTerm, filterStatus])

  const sortedCandidates = useMemo(() => {
    if (!sortConfig) return filteredCandidates
    return [...filteredCandidates].sort((a, b) => {
      if (a[sortConfig.key as keyof Candidate] < b[sortConfig.key as keyof Candidate]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key as keyof Candidate] > b[sortConfig.key as keyof Candidate]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [filteredCandidates, sortConfig])

  const openInterviewModal = (candidate: Candidate, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedCandidate(candidate)
    setIsInterviewModalOpen(true)
  }

  const closeInterviewModal = () => {
    setIsInterviewModalOpen(false)
    setSelectedCandidate(null)
  }

  const handleCandidateClick = (candidateId: number) => {
    navigate(`/candidates/${candidateId}`)
  }

  const handleMessageClick = (candidateId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/communication?candidateId=${candidateId}`)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Candidates</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div>
          <select
            className="border rounded-lg px-3 py-2"
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus(e.target.value || null)}
          >
            <option value="">All Statuses</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Salary</th>
              <th className="px-4 py-2 text-left">Bill Rate</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((candidate) => (
              <tr 
                key={candidate.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleCandidateClick(candidate.id)}
              >
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <img src={candidate.image} alt={candidate.name} className="w-10 h-10 rounded-full mr-3" />
                    {candidate.name}
                  </div>
                </td>
                <td className="px-4 py-2">{candidate.position}</td>
                <td className="px-4 py-2">${candidate.salary.toLocaleString()}</td>
                <td className="px-4 py-2">${candidate.billRate}/hr</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    candidate.status === 'Screening' ? 'bg-yellow-200 text-yellow-800' :
                    candidate.status === 'Interview' ? 'bg-blue-200 text-blue-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={(e) => openInterviewModal(candidate, e)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Calendar size={20} />
                    </button>
                    <button 
                      onClick={(e) => handleMessageClick(candidate.id, e)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <MessageSquare size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isInterviewModalOpen && selectedCandidate && (
        <ScheduleInterviewModal
          candidate={selectedCandidate}
          onClose={closeInterviewModal}
        />
      )}
    </div>
  )
}

export default Candidates