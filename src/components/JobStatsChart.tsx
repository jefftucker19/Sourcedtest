import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface JobStats {
  submitted: number
  shortlisted: number
  interviewed: number
  rejectedResume: number
  rejectedPostInterview: number
  offered: number
  hired: number  // New field
}

interface JobStatsChartProps {
  stats: JobStats
}

const JobStatsChart: React.FC<JobStatsChartProps> = ({ stats }) => {
  const data = {
    labels: ['Submitted', 'Shortlisted', 'Interviewed', 'Rejected (Resume)', 'Rejected (Post-Interview)', 'Offered', 'Hired'],
    datasets: [
      {
        label: 'Number of Candidates',
        data: [
          stats.submitted,
          stats.shortlisted,
          stats.interviewed,
          stats.rejectedResume,
          stats.rejectedPostInterview,
          stats.offered,
          stats.hired,  // New field
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(46, 204, 113, 0.6)',  // New color for Hired
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(46, 204, 113, 1)',  // New color for Hired
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Candidate Pipeline Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Candidates',
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default JobStatsChart