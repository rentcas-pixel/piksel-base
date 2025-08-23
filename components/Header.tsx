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
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-14">
          {/* Logo ir pavadinimas */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base">P</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Piksel Base</h1>
            </div>
          </div>

          {/* Paieškos laukas */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ieškoti užsakymų..."
                className="block w-full pl-12 pr-4 py-2.5 text-sm border-0 rounded-2xl bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
              />
            </form>
          </div>

          {/* Veiksmų mygtukai */}
          <div className="flex items-center space-x-3">
            {/* Pridėti mygtukas */}
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Pridėti</span>
            </button>

            {/* Refresh mygtukas */}
            <button className="inline-flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200">
              <RefreshCw className="h-4 w-4" />
            </button>

            {/* Settings mygtukas */}
            <button className="inline-flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200">
              <Settings className="h-4 w-4" />
            </button>

            {/* Autentifikavimo mygtukas */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Prisijungti</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
