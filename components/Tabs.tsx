'use client'

interface TabsProps {
  activeTab: 'ekranai' | 'viadukai'
  onTabChange: (tab: 'ekranai' | 'viadukai') => void
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-6">
          <button
            onClick={() => onTabChange('ekranai')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'ekranai'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ekranai
          </button>
          <button
            onClick={() => onTabChange('viadukai')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'viadukai'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Viadukai
          </button>
        </div>
      </div>
    </div>
  )
}
