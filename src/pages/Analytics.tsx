import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import JobStatsChart from '../components/JobStatsChart'

interface Job {
  id: number
  title: string
  status: 'Open' | 'Closed'
  stats: {
    submitted: number
    shortlisted: number
    interviewed: number
    rejectedResume: number
    rejectedPostInterview: number
    offered: number
  }
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    status: 'Open',
    stats: {
      submitted: 50,
      shortlisted: 20,
      interviewed: 10,
      rejectedResume: 25,
      rejectedPostInterview: 5,
      offered: 2
    }
  },
  {
    id: 2,
    title: 'Product Manager',
    status: 'Closed',
    stats: {
      submitted: 40,
      shortlisted: 15,
      interviewed: 8,
      rejectedResume: 20,
      rejectedPostInterview: 4,
      offered: 1
    }
  },
  {
    id: 3,
    title: 'UX Designer',
    status: 'Open',
    stats: {
      submitted: 30,
      shortlisted: 12,
      interviewed: 6,
      rejectedResume: 15,
      rejectedPostInterview: 3,
      offered: 1
    }
  }
]

const Analytics: React.FC = () => {
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState<Job>(mockJobs[0])

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-6">Job Analytics</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="jobSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Select Job
          </label>
          <select
            id="jobSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedJob.id}
            onChange={(e) => setSelectedJob(mockJobs.find(job => job.id === parseInt(e.target.value)) || mockJobs[0])}
          >
            {mockJobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.status})
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Job Statistics: {selectedJob.title}</h2>
        <JobStatsChart stats={selectedJob.stats} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Skills in Demand</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>JavaScript</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">78%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>React</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">65%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Python</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">52%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>AWS</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">47%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Node.js</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">41%</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Hiring Process Metrics</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Average Time to Hire</span>
              <span className="font-semibold">23 days</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Interview to Offer Ratio</span>
              <span className="font-semibold">68%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Offer Acceptance Rate</span>
              <span className="font-semibold">82%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Candidate Satisfaction</span>
              <span className="font-semibold">4.7/5</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Cost per Hire</span>
              <span className="font-semibold">$4,200</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Analytics