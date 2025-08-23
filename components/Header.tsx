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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo ir pavadinimas */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Piksel Base</h1>
            </div>
          </div>

          {/* Paieškos laukas */}
          <div className="flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ieškoti užsakymų..."
                className="block w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>
          </div>

          {/* Veiksmų mygtukai */}
          <div className="flex items-center space-x-2">
            {/* Pridėti mygtukas */}
            <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded border border-green-600">
              <Plus className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Pridėti</span>
            </button>

            {/* Refresh mygtukas */}
            <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300">
              <RefreshCw className="h-3 w-3" />
            </button>

            {/* Settings mygtukas */}
            <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300">
              <Settings className="h-3 w-3" />
            </button>

            {/* Autentifikavimo mygtukas */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
              >
                <LogOut className="h-3 w-3" />
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded border border-blue-600"
              >
                <User className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
