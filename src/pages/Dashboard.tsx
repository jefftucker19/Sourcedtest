import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, Users, Calendar, MessageSquare, TrendingUp, CheckCircle, ExternalLink, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
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
    hired: number
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
      offered: 2,
      hired: 1
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
      offered: 1,
      hired: 1
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
      offered: 1,
      hired: 0
    }
  }
]

const OverviewCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="p-3 bg-blue-500 rounded-full">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 text-white' })}
      </div>
    </div>
  </div>
)

const ActivityItem: React.FC<{ activity: { type: string; content: string; date: string } }> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Users className="w-5 h-5 text-blue-500" />
      case 'interview':
        return <Calendar className="w-5 h-5 text-green-500" />
      case 'offer':
        return <CheckCircle className="w-5 h-5 text-purple-500" />
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900">{activity.content}</p>
        <p className="text-sm text-gray-500">{activity.date}</p>
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0])
  const [overviewData, setOverviewData] = useState({
    openPositions: 0,
    activeApplications: 0,
    scheduledInterviews: 0,
    offersExtended: 0
  })

  useEffect(() => {
    // Calculate overview data based on jobs
    const openPositions = jobs.filter(job => job.status === 'Open').length
    const activeApplications = jobs.reduce((sum, job) => sum + job.stats.submitted, 0)
    const scheduledInterviews = jobs.reduce((sum, job) => sum + job.stats.interviewed, 0)
    const offersExtended = jobs.reduce((sum, job) => sum + job.stats.offered, 0)

    setOverviewData({
      openPositions,
      activeApplications,
      scheduledInterviews,
      offersExtended
    })
  }, [jobs])

  const handleJobChange = (jobId: number) => {
    const newSelectedJob = jobs.find(job => job.id === jobId)
    if (newSelectedJob) {
      setSelectedJob(newSelectedJob)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <OverviewCard title="Open Positions" value={overviewData.openPositions} icon={<Briefcase />} />
        <OverviewCard title="Active Applications" value={overviewData.activeApplications} icon={<Users />} />
        <OverviewCard title="Scheduled Interviews" value={overviewData.scheduledInterviews} icon={<Calendar />} />
        <OverviewCard title="Offers Extended" value={overviewData.offersExtended} icon={<CheckCircle />} />
      </div>

      {/* Job Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Job Statistics</h2>
        <div className="mb-4">
          <label htmlFor="jobSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Select Job
          </label>
          <select
            id="jobSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedJob.id}
            onChange={(e) => handleJobChange(Number(e.target.value))}
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.status})
              </option>
            ))}
          </select>
        </div>
        <JobStatsChart stats={selectedJob.stats} />
        <div className="mt-4 text-right">
          <Link
            to={`/job-requests/${selectedJob.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Job Details
            <ExternalLink size={16} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Top Skills in Demand and Hiring Process Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
              <span className="font-semibold text-green-600">23 days</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Interview to Offer Ratio</span>
              <span className="font-semibold text-green-600">68%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Offer Acceptance Rate</span>
              <span className="font-semibold text-green-600">82%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Candidate Satisfaction</span>
              <span className="font-semibold text-green-600">4.7/5</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Cost per Hire</span>
              <span className="font-semibold text-green-600">$4,200</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ActivityItem
          activity={{
            type: 'application',
            content: 'New application received for Senior Software Engineer position',
            date: '2 hours ago'
          }}
        />
        <ActivityItem
          activity={{
            type: 'interview',
            content: 'Interview scheduled with John Doe for Product Manager role',
            date: '1 day ago'
          }}
        />
        <ActivityItem
          activity={{
            type: 'offer',
            content: 'Offer extended to Jane Smith for UX Designer position',
            date: '3 days ago'
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard