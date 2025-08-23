'use client'

interface TabsProps {
  activeTab: 'ekranai' | 'viadukai'
  onTabChange: (tab: 'ekranai' | 'viadukai') => void
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button
            onClick={() => onTabChange('ekranai')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'ekranai'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            🖥️ Ekranai
          </button>
          <button
            onClick={() => onTabChange('viadukai')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'viadukai'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            🌉 Viadukai
          </button>
        </div>
      </div>
    </div>
  )
}
