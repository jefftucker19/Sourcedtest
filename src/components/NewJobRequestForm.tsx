import React, { useState } from 'react'
import { X } from 'lucide-react'
import ProgressBar from './ProgressBar'

interface NewJobRequestFormProps {
  onClose: () => void
  onSubmit: (jobRequest: any) => void
}

const NewJobRequestForm: React.FC<NewJobRequestFormProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    positionTitle: '',
    employmentType: '',
    salaryRangeLow: '',
    salaryRangeHigh: '',
    hourlyRateLow: '',
    hourlyRateHigh: '',
    workAuthorization: '',
    hasJobDescription: null,
    jobDescription: '',
    workLocationType: '',
    officeAddress: '',
    technologies: ['', '', ''],
    requiredExperiences: [
      { type: '', years: '' },
      { type: '', years: '' },
      { type: '', years: '' },
    ],
    positionOpenReason: '',
    urgency: '',
  })

  const totalSteps = 12

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleArrayChange = (index: number, field: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: prevData[field].map((item, i) => i === index ? value : item)
    }))
  }

  const handleExperienceChange = (index: number, field: 'type' | 'years', value: string) => {
    setFormData(prevData => ({
      ...prevData,
      requiredExperiences: prevData.requiredExperiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const handleNext = () => {
    if (isStepValid()) {
      setStep(prevStep => prevStep + 1)
    } else {
      alert('Please fill in all required fields before proceeding.')
    }
  }

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isStepValid()) {
      onSubmit(formData)
      onClose()
    } else {
      alert('Please fill in all required fields before submitting.')
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.companyName && formData.positionTitle
      case 2:
        return formData.employmentType
      case 3:
        return formData.employmentType === 'Contract'
          ? (formData.hourlyRateLow && formData.hourlyRateHigh)
          : (formData.salaryRangeLow && formData.salaryRangeHigh)
      case 4:
        return formData.workAuthorization
      case 5:
        return formData.hasJobDescription !== null
      case 6:
        return formData.hasJobDescription ? formData.jobDescription : formData.jobDescription.length > 0
      case 7:
        return formData.workLocationType
      case 8:
        return formData.workLocationType === 'Remote' || formData.officeAddress
      case 9:
        return formData.technologies.every(tech => tech)
      case 10:
        return formData.requiredExperiences.every(exp => exp.type && exp.years)
      case 11:
        return formData.positionOpenReason
      case 12:
        return formData.urgency
      default:
        return true
    }
  }

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Company Info</h3>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Name of Company</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700">Position Title</label>
              <input
                type="text"
                id="positionTitle"
                name="positionTitle"
                value={formData.positionTitle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Employment Type</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">What type of employment is this position?</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select employment type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Contract-to-hire">Contract-to-hire</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Compensation</h3>
            {formData.employmentType === 'Contract' ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Hourly Bill Rate Range</label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    name="hourlyRateLow"
                    value={formData.hourlyRateLow}
                    onChange={handleChange}
                    placeholder="Low"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                  <input
                    type="number"
                    name="hourlyRateHigh"
                    value={formData.hourlyRateHigh}
                    onChange={handleChange}
                    placeholder="High"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Target Salary Range</label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    name="salaryRangeLow"
                    value={formData.salaryRangeLow}
                    onChange={handleChange}
                    placeholder="Low"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                  <input
                    type="number"
                    name="salaryRangeHigh"
                    value={formData.salaryRangeHigh}
                    onChange={handleChange}
                    placeholder="High"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        )
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Work Authorization Eligibility</h3>
            <div className="mb-4">
              <select
                name="workAuthorization"
                value={formData.workAuthorization}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select work authorization</option>
                <option value="US Citizen">US Citizen</option>
                <option value="Green Card">Green Card</option>
                <option value="H1-B Visa">H1-B Visa</option>
                <option value="OPT">OPT</option>
                <option value="CPT">CPT</option>
                <option value="Open to all">Open to all Work Authorization Statuses</option>
              </select>
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Do you have a job description?</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="hasJobDescription"
                    value="yes"
                    checked={formData.hasJobDescription === true}
                    onChange={() => setFormData(prev => ({ ...prev, hasJobDescription: true }))}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="hasJobDescription"
                    value="no"
                    checked={formData.hasJobDescription === false}
                    onChange={() => setFormData(prev => ({ ...prev, hasJobDescription: false }))}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {formData.hasJobDescription ? "Job Description" : "Required Experiences"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {formData.hasJobDescription
                  ? "Please paste your job description here:"
                  : "Please describe all required experiences:"}
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
          </div>
        )
      case 7:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Work Location Type</h3>
            <div className="mb-4">
              <select
                name="workLocationType"
                value={formData.workLocationType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select work location type</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="Remote + Travel">Remote + Travel</option>
              </select>
            </div>
          </div>
        )
      case 8:
        return formData.workLocationType !== 'Remote' ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Office Address</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Please provide the office address:</label>
              <input
                type="text"
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
        ) : null
      case 9:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Technologies and Skills</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Top 3 technologies or skills required:</label>
              {formData.technologies.map((tech, index) => (
                <input
                  key={index}
                  type="text"
                  value={tech}
                  onChange={(e) => handleArrayChange(index, 'technologies', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              ))}
            </div>
          </div>
        )
      case 10:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Required Experiences</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Top 3 required experiences and years:</label>
              {formData.requiredExperiences.map((exp, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    value={exp.type}
                    onChange={(e) => handleExperienceChange(index, 'type', e.target.value)}
                    placeholder="Experience"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                  <input
                    type="number"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                    placeholder="Years"
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        )
      case 11:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Reason for Opening</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Why is the position open?</label>
              <select
                name="positionOpenReason"
                value={formData.positionOpenReason}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select reason</option>
                <option value="Growth">Growth</option>
                <option value="Backfill">Backfill</option>
                <option value="Specialized Skill">Specialized Skill</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        )
      case 12:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Urgency</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">How quickly do you need this position filled?</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select urgency</option>
                <option value="48-hours">48-hours</option>
                <option value="1 week">1 week</option>
                <option value="2 Weeks">2 Weeks</option>
                <option value="3 Weeks">3 Weeks</option>
                <option value="1-month">1-month</option>
                <option value="No Urgency">No Urgency</option>
              </select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">New Job Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
        <form onSubmit={handleSubmit} className="mt-4">
          {renderQuestion()}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Previous
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewJobRequestForm