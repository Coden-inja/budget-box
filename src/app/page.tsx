import BudgetForm from '../components/BudgetForm';
import Dashboard from '../components/Dashboard';
import SyncIndicator from '../components/SyncIndicator';

export default function Home() {
  return (
    // Changed bg-gray-100 to bg-slate-50 for a modern, cleaner look
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Increased max-width from 4xl to 6xl to give the dashboard room */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
             {/* Added a logo icon/emoji wrapper */}
             <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-lg shadow-blue-200">
                📦
             </div>
             <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">BudgetBox</h1>
          </div>
          <SyncIndicator />
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form (Takes up 4/12 columns) */}
          <div className="lg:col-span-4 sticky top-8">
            <BudgetForm />
          </div>

          {/* Right Column: Analytics (Takes up 8/12 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <Dashboard />
          </div>

        </div>
      </div>
    </main>
  );
}