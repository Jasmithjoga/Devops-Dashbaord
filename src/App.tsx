import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar'
import { TopNav } from './components/layout/TopNav'
import { Dashboard } from './pages/Dashboard'
import { SettingsModal } from './components/ui/SettingsModal'
import { SecurityModal } from './components/ui/SecurityModal'

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 selection:text-white">
      {/* Sidebar */}
      <Sidebar onOpenSettings={() => setShowSettings(true)} onOpenSecurity={() => setShowSecurity(true)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ml-[260px] md:ml-[260px] max-md:ml-20">
        <TopNav />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <Dashboard />
        </main>
      </div>

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <SecurityModal isOpen={showSecurity} onClose={() => setShowSecurity(false)} />
    </div>
  )
}

export default App
