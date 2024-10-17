import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { MapPin, Linkedin, Github, Calendar, MessageSquare, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import RejectModal from './RejectModal'

interface Candidate {
  id: number
  name: string
  stage: string
  image: string
  location: string
  linkedin?: string
  github?: string
}

interface KanbanBoardProps {
  candidates: Candidate[]
  onDragEnd: (candidateId: number, newStage: string, rejectReason?: string, rejectDetails?: string) => void
}

const stages = ["New Profiles", "Screening", "Interview", "Offer", "Hired", "Rejected"]

const CandidateCard: React.FC<{ candidate: Candidate, index: number }> = ({ candidate, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANDIDATE',
    item: { id: candidate.id, stage: candidate.stage },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`bg-white p-3 mb-2 rounded shadow hover:shadow-md transition-shadow duration-200 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center mb-2">
        <img 
          src={candidate.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`}
          alt={candidate.name} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">{candidate.name}</h4>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span>{candidate.location}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-2">
          {candidate.linkedin && (
            <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <Linkedin size={16} />
            </a>
          )}
          {candidate.github && (
            <a href={candidate.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              <Github size={16} />
            </a>
          )}
        </div>
        <div className="flex space-x-2">
          <Link to={`/candidates/${candidate.id}/schedule-interview`} className="text-purple-600 hover:text-purple-800">
            <Calendar size={16} />
          </Link>
          <Link to={`/communication?candidateId=${candidate.id}`} className="text-green-600 hover:text-green-800">
            <MessageSquare size={16} />
          </Link>
          <Link to={`/candidates/${candidate.id}`} className="text-blue-600 hover:text-blue-800">
            <Eye size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

const StageColumn: React.FC<{ stage: string, candidates: Candidate[], onDragEnd: (candidateId: number, newStage: string, rejectReason?: string, rejectDetails?: string) => void }> = ({ stage, candidates, onDragEnd }) => {
  const [, drop] = useDrop(() => ({
    accept: 'CANDIDATE',
    drop: (item: { id: number }) => {
      if (stage === 'Rejected') {
        setShowRejectModal(true)
        setRejectingCandidateId(item.id)
      } else {
        onDragEnd(item.id, stage)
      }
    },
  }))

  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectingCandidateId, setRejectingCandidateId] = useState<number | null>(null)

  const handleReject = (reason: string, details: string) => {
    if (rejectingCandidateId) {
      onDragEnd(rejectingCandidateId, 'Rejected', reason, details)
    }
    setShowRejectModal(false)
    setRejectingCandidateId(null)
  }

  return (
    <div ref={drop} className="flex-1 min-w-[200px] max-w-[250px]">
      <h3 className="font-semibold mb-2">{stage}</h3>
      <div className={`p-2 rounded-lg min-h-[200px] ${stage === 'Rejected' ? 'bg-red-100' : 'bg-gray-100'}`}>
        {candidates
          .filter((candidate) => candidate.stage === stage)
          .map((candidate, index) => (
            <CandidateCard key={candidate.id} candidate={candidate} index={index} />
          ))}
      </div>
      {showRejectModal && (
        <RejectModal onClose={() => setShowRejectModal(false)} onReject={handleReject} />
      )}
    </div>
  )
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ candidates, onDragEnd }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <StageColumn 
            key={stage} 
            stage={stage} 
            candidates={candidates} 
            onDragEnd={onDragEnd} 
          />
        ))}
      </div>
    </DndProvider>
  )
}

export default KanbanBoard