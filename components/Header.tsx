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
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo ir pavadinimas */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Piksel Base</h1>
              <p className="text-sm text-neutral-500">Užsakymų valdymo sistema</p>
            </div>
          </div>

          {/* Paieškos laukas */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ieškoti užsakymų..."
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </form>
          </div>

          {/* Veiksmų mygtukai */}
          <div className="flex items-center space-x-3">
            {/* Pridėti mygtukas */}
            <button className="btn-success flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Pridėti</span>
            </button>

            {/* Admin mygtukas */}
            <button className="btn-primary flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Refresh mygtukas */}
            <button className="btn-neutral flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Atnaujinti</span>
            </button>

            {/* Settings mygtukas */}
            <button className="btn-neutral flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Nustatymai</span>
            </button>

            {/* Autentifikavimo mygtukas */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="btn-neutral flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Atsijungti</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="btn-primary flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Prisijungti</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
