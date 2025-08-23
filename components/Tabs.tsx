'use client'

interface TabsProps {
  activeTab: 'ekranai' | 'viadukai'
  onTabChange: (tab: 'ekranai' | 'viadukai') => void
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full px-8 lg:px-12">
        <div className="flex space-x-8">
          <button
            onClick={() => onTabChange('ekranai')}
            className={`py-3 px-2 text-base font-medium border-b-2 transition-colors ${
              activeTab === 'ekranai'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ekranai
          </button>
          <button
            onClick={() => onTabChange('viadukai')}
            className={`py-3 px-2 text-base font-medium border-b-2 transition-colors ${
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
