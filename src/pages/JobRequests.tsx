import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Users } from 'lucide-react'
import NewJobRequestForm from '../components/NewJobRequestForm'

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

const JobRequests: React.FC = () => {
  const [jobRequests, setJobRequests] = useState<Job[]>([
    { 
      id: 1, 
      title: 'Senior Software Engineer', 
      department: 'Engineering', 
      status: 'Open', 
      date: '2023-04-10',
      description: 'We are looking for an experienced software engineer to join our team.',
      requirements: ['5+ years of experience', 'Proficient in React and Node.js', 'Strong problem-solving skills'],
      candidates: [
        { id: 1, name: 'John Doe', stage: 'Interview' },
        { id: 2, name: 'Jane Smith', stage: 'Screening' },
      ]
    },
    { 
      id: 2, 
      title: 'Marketing Manager', 
      department: 'Marketing', 
      status: 'In Progress', 
      date: '2023-04-12',
      description: 'We are seeking a creative and strategic marketing manager to lead our marketing efforts.',
      requirements: ['7+ years of marketing experience', 'Proven track record in digital marketing', 'Excellent communication skills'],
      candidates: [
        { id: 3, name: 'Alice Johnson', stage: 'Offer' },
      ]
    },
    { 
      id: 3, 
      title: 'Sales Representative', 
      department: 'Sales', 
      status: 'Closed', 
      date: '2023-04-15',
      description: 'We are looking for an energetic sales representative to join our growing team.',
      requirements: ['3+ years of sales experience', 'Strong negotiation skills', 'Self-motivated and results-driven'],
      candidates: []
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [showNewJobForm, setShowNewJobForm] = useState(false)

  const filteredJobRequests = jobRequests.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === '' || job.status === filterStatus)
  ).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() :
                                   new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === 'title') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }
    return 0
  })

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const handleNewJobSubmit = (newJob: any) => {
    const formattedJob: Job = {
      id: jobRequests.length + 1,
      title: newJob.positionTitle,
      department: newJob.companyName,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      description: newJob.jobDescription,
      requirements: [
        ...newJob.technologies,
        ...newJob.requiredExperiences.map(exp => `${exp.type}: ${exp.years} years`)
      ],
      candidates: []
    }
    setJobRequests(prevJobs => [...prevJobs, formattedJob])
    setShowNewJobForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Requests</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setShowNewJobForm(true)}
        >
          <Plus size={20} className="mr-2" />
          New Job Request
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search job requests..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div>
          <select
            className="border rounded-lg px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobRequests.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/job-requests/${job.id}`} className="text-blue-600 hover:text-blue-800">
                    {job.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{job.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    job.status === 'Open' ? 'bg-green-100 text-green-800' :
                    job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{job.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    {job.candidates.length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/job-requests/${job.id}`} className="text-indigo-600 hover:text-indigo-900">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showNewJobForm && (
        <NewJobRequestForm
          onClose={() => setShowNewJobForm(false)}
          onSubmit={handleNewJobSubmit}
        />
      )}
    </div>
  )
}

export default JobRequests