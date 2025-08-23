'use client'

import { Search, Plus, RefreshCw, Settings, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="w-full px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo ir pavadinimas */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Piksel Base Logo" 
              className="h-8 w-auto"
            />
          </div>

          {/* Paieškos laukas */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>
          </div>

          {/* Veiksmų mygtukai */}
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded text-sm px-3 py-2 text-gray-700">
              <option>Visi statusai</option>
            </select>
            <input type="date" className="border border-gray-300 rounded text-sm px-3 py-2 text-gray-700" />
            <input type="date" className="border border-gray-300 rounded text-sm px-3 py-2 text-gray-700" />
            <select className="border border-gray-300 rounded text-sm px-3 py-2 text-gray-700">
              <option>Rūšiuoti: Data nuo</option>
            </select>
            <button 
              onClick={() => console.log('Pridėti mygtukas paspaustas')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
            >
              + Pridėti
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
