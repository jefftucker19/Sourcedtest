import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Briefcase, Calendar, MessageSquare, LayoutDashboard, LogOut, X, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation()
  const { logout } = useAuth()

  const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
    <Link
      to={to}
      className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
        location.pathname === to ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
      }`}
      onClick={() => setOpen(false)}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  )

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-300 ease-in-out lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      ></div>
      <aside
        className={`bg-blue-800 text-white w-64 min-h-screen fixed top-0 left-0 z-30 transition-transform duration-300 ease-in-out transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Staffing Portal</h2>
          <button onClick={() => setOpen(false)} className="text-white focus:outline-none lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} text="Dashboard" />
            <NavLink to="/job-requests" icon={<Briefcase size={20} />} text="Job Requests" />
            <NavLink to="/candidates" icon={<Users size={20} />} text="Candidates" />
            <NavLink to="/interviews" icon={<Calendar size={20} />} text="Interviews" />
            <NavLink to="/communication" icon={<MessageSquare size={20} />} text="Communication" />
            <NavLink to="/analytics" icon={<TrendingUp size={20} />} text="Analytics" />
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={logout}
            className="flex items-center py-2 px-4 rounded text-gray-300 hover:bg-blue-700 hover:text-white transition-colors duration-200 w-full"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar