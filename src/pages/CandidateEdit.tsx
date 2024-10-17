import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

// Mock function to get candidate data (replace with actual API call)
const getCandidateData = (id: string) => {
  // This would be an API call in a real application
  return Promise.resolve({
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    salary: 120000,
    billRate: 75,
    status: 'Screening',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  })
}

const CandidateEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState({
    name: '',
    position: '',
    salary: 0,
    billRate: 0,
    status: '',
    resumeUrl: ''
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  useEffect(() => {
    getCandidateData(id!).then(setCandidate)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCandidate(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to update the candidate
    // Including uploading the new resume if one was selected
    if (resumeFile) {
      // Upload the resume file and get the new URL
      // This is a placeholder for the actual upload logic
      const newResumeUrl = await uploadResume(resumeFile)
      setCandidate(prev => ({ ...prev, resumeUrl: newResumeUrl }))
    }
    console.log('Updated candidate:', candidate)
    navigate(`/candidates/${id}`)
  }

  // Placeholder function for resume upload
  const uploadResume = async (file: File): Promise<string> => {
    // This would be replaced with actual file upload logic
    console.log('Uploading file:', file.name)
    return URL.createObjectURL(file) // This is just for demonstration
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
      <h1 className="text-3xl font-bold mb-6">Edit Candidate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... existing form fields ... */}
        
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor="resume"
              className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Upload size={16} className="mr-2 inline" />
              Upload New Resume
            </label>
            {resumeFile && <span className="ml-3">{resumeFile.name}</span>}
          </div>
        </div>
        
        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default CandidateEdit