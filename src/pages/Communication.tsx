import React, { useState } from 'react'
import { Send, Search, Calendar, User } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}

interface Conversation {
  id: number
  candidateName: string
  candidateId: number
  jobTitle: string
  jobId: number
  lastMessage: string
  messages: Message[]
}

const initialConversations: Conversation[] = [
  {
    id: 1,
    candidateName: 'John Doe',
    candidateId: 101,
    jobTitle: 'Senior Software Engineer',
    jobId: 201,
    lastMessage: 'Hello, I have a question about the job opening.',
    messages: [
      { id: 1, sender: 'John Doe', content: 'Hello, I have a question about the job opening.', timestamp: '2023-04-15 09:30 AM' },
      { id: 2, sender: 'Recruiter', content: "Sure, I'd be happy to help. What would you like to know?", timestamp: '2023-04-15 09:35 AM' },
      { id: 3, sender: 'John Doe', content: 'Is remote work an option for this position?', timestamp: '2023-04-15 09:40 AM' },
    ]
  },
  {
    id: 2,
    candidateName: 'Jane Smith',
    candidateId: 102,
    jobTitle: 'UX Designer',
    jobId: 202,
    lastMessage: 'Thank you for considering my application.',
    messages: [
      { id: 1, sender: 'Jane Smith', content: 'Thank you for considering my application.', timestamp: '2023-04-14 14:20 PM' },
      { id: 2, sender: 'Recruiter', content: "You're welcome! We were impressed with your resume.", timestamp: '2023-04-14 14:30 PM' },
    ]
  },
  {
    id: 3,
    candidateName: 'Mike Johnson',
    candidateId: 103,
    jobTitle: 'Product Manager',
    jobId: 203,
    lastMessage: "I'm looking forward to the interview!",
    messages: [
      { id: 1, sender: 'Recruiter', content: "Hi Mike, we'd like to schedule an interview with you.", timestamp: '2023-04-13 11:00 AM' },
      { id: 2, sender: 'Mike Johnson', content: 'That sounds great! When were you thinking?', timestamp: '2023-04-13 11:15 AM' },
      { id: 3, sender: 'Recruiter', content: 'How about next Tuesday at 2 PM?', timestamp: '2023-04-13 11:20 AM' },
      { id: 4, sender: 'Mike Johnson', content: "I'm looking forward to the interview!", timestamp: '2023-04-13 11:25 AM' },
    ]
  },
]

const Communication: React.FC = () => {
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          const newMessageObj = {
            id: conv.messages.length + 1,
            sender: 'Recruiter',
            content: newMessage,
            timestamp: new Date().toLocaleString()
          }
          return {
            ...conv,
            lastMessage: newMessage,
            messages: [...conv.messages, newMessageObj]
          }
        }
        return conv
      })
      setConversations(updatedConversations)
      setSelectedConversation(updatedConversations.find(conv => conv.id === selectedConversation.id) || null)
      setNewMessage('')
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Communication</h1>
      <div className="flex-grow flex overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 bg-gray-100 overflow-y-auto">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-200 ${selectedConversation?.id === conv.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <h3 className="font-semibold">{conv.candidateName}</h3>
              <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                {conv.jobTitle}
              </span>
            </div>
          ))}
        </div>

        {/* Conversation View */}
        {selectedConversation ? (
          <div className="w-2/3 flex flex-col bg-white">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{selectedConversation.candidateName}</h2>
                <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                  {selectedConversation.jobTitle}
                </span>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/candidates/${selectedConversation.candidateId}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded flex items-center transition-colors duration-200"
                >
                  <User size={14} className="mr-1" />
                  Profile
                </Link>
                <Link
                  to={`/candidates/${selectedConversation.candidateId}/schedule-interview`}
                  className="bg-green-100 hover:bg-green-200 text-green-800 text-sm px-3 py-1 rounded flex items-center transition-colors duration-200"
                >
                  <Calendar size={14} className="mr-1" />
                  Schedule
                </Link>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === 'Recruiter' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg ${message.sender === 'Recruiter' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <p className="font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow mr-2 p-2 border rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Send size={20} className="mr-2" />
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-2/3 flex items-center justify-center bg-white">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Communication