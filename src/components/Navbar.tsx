import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Briefcase, Calendar, MessageSquare, LayoutDashboard } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">Staffing Portal</Link>
          <div className="flex space-x-4">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} text="Dashboard" />
            <NavLink to="/job-requests" icon={<Briefcase size={20} />} text="Job Requests" />
            <NavLink to="/candidates" icon={<Users size={20} />} text="Candidates" />
            <NavLink to="/interviews" icon={<Calendar size={20} />} text="Interviews" />
            <NavLink to="/communication" icon={<MessageSquare size={20} />} text="Communication" />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center hover:bg-blue-700 px-3 py-2 rounded">
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
)

export default Navbar