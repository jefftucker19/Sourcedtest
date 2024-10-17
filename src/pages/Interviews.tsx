import React, { useState, useMemo } from 'react'
import { Calendar, Edit, Trash2, Search, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import RescheduleInterviewModal from '../components/RescheduleInterviewModal'
import { Link } from 'react-router-dom'

interface Interview {
  id: number
  candidate: string
  position: string
  date: string
  time: string
  interviewer: string
  status: 'Scheduled' | 'Completed' | 'Cancelled'
}

const Interviews: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([
    { id: 1, candidate: 'John Doe', position: 'Software Engineer', date: '2023-04-15', time: '10:00 AM', interviewer: 'Alice Johnson', status: 'Scheduled' },
    { id: 2, candidate: 'Jane Smith', position: 'Product Manager', date: '2023-04-16', time: '2:00 PM', interviewer: 'Bob Williams', status: 'Scheduled' },
    { id: 3, candidate: 'Mike Johnson', position: 'UX Designer', date: '2023-04-17', time: '11:30 AM', interviewer: 'Carol Brown', status: 'Scheduled' },
    { id: 4, candidate: 'Sarah Lee', position: 'Data Scientist', date: '2023-04-14', time: '3:00 PM', interviewer: 'David Miller', status: 'Completed' },
    { id: 5, candidate: 'Tom Wilson', position: 'Marketing Specialist', date: '2023-04-13', time: '1:30 PM', interviewer: 'Emma Davis', status: 'Cancelled' },
  ])
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Interview; direction: 'asc' | 'desc' } | null>(null)
  const [filterStatus, setFilterStatus] = useState<Interview['status'] | 'All'>('All')

  const handleReschedule = (interview: Interview) => {
    setSelectedInterview(interview)
    setShowRescheduleModal(true)
  }

  const handleRescheduleSubmit = (newDate: string, newTime: string) => {
    setInterviews(prevInterviews =>
      prevInterviews.map(interview =>
        interview.id === selectedInterview?.id
          ? { ...interview, date: newDate, time: newTime }
          : interview
      )
    )
    setShowRescheduleModal(false)
    setSelectedInterview(null)
  }

  const handleCancel = (interviewId: number) => {
    if (window.confirm('Are you sure you want to cancel this interview?')) {
      setInterviews(prevInterviews => prevInterviews.map(interview =>
        interview.id === interviewId ? { ...interview, status: 'Cancelled' } : interview
      ))
    }
  }

  const handleSort = (key: keyof Interview) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const filteredAndSortedInterviews = useMemo(() => {
    let result = interviews.filter(interview =>
      (interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
       interview.position.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'All' || interview.status === filterStatus)
    )

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [interviews, searchTerm, sortConfig, filterStatus])

  const SortIcon: React.FC<{ column: keyof Interview }> = ({ column }) => {
    if (sortConfig?.key === column) {
      return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
    }
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interviews</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search interviews..."
            className="pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-gray-500" />
          <select
            className="border rounded-lg px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Interview['status'] | 'All')}
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('candidate')}>
                Candidate {sortConfig?.key === 'candidate' && <SortIcon column="candidate" />}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('position')}>
                Position {sortConfig?.key === 'position' && <SortIcon column="position" />}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                Date {sortConfig?.key === 'date' && <SortIcon column="date" />}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('time')}>
                Time {sortConfig?.key === 'time' && <SortIcon column="time" />}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('interviewer')}>
                Interviewer {sortConfig?.key === 'interviewer' && <SortIcon column="interviewer" />}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortConfig?.key === 'status' && <SortIcon column="status" />}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedInterviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/candidates/${interview.id}`} className="text-blue-600 hover:text-blue-800">
                    {interview.candidate}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    interview.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {interview.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {interview.status === 'Scheduled' && (
                    <>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={() => handleReschedule(interview)}
                      >
                        <Edit size={16} className="inline mr-1" />
                        Reschedule
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleCancel(interview.id)}
                      >
                        <Trash2 size={16} className="inline mr-1" />
                        Cancel
                      </button>
                    </>
                  )}
                  {interview.status === 'Completed' && (
                    <Link to={`/interviews/${interview.id}/feedback`} className="text-green-600 hover:text-green-800">
                      View Feedback
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showRescheduleModal && selectedInterview && (
        <RescheduleInterviewModal
          interview={selectedInterview}
          onClose={() => setShowRescheduleModal(false)}
          onSubmit={handleRescheduleSubmit}
        />
      )}
    </div>
  )
}

export default Interviews