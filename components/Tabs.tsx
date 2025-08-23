'use client'

interface TabsProps {
  activeTab: 'ekranai' | 'viadukai'
  onTabChange: (tab: 'ekranai' | 'viadukai') => void
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex space-x-1">
          <button
            onClick={() => onTabChange('ekranai')}
            className={`py-3 px-6 rounded-2xl font-medium text-sm transition-all duration-300 ${
              activeTab === 'ekranai'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            Ekranai
          </button>
          <button
            onClick={() => onTabChange('viadukai')}
            className={`py-3 px-6 rounded-2xl font-medium text-sm transition-all duration-300 ${
              activeTab === 'viadukai'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            Viadukai
          </button>
        </div>
      </div>
    </div>
  )
}
