import BudgetForm from '../components/BudgetForm';
import Dashboard from '../components/Dashboard';
import SyncIndicator from '../components/SyncIndicator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">BudgetBox 📦</h1>
          <SyncIndicator />
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-1">
            <BudgetForm />
          </div>

          {/* Right Column: Analytics */}
          <div className="lg:col-span-2">
            <Dashboard />
          </div>

        </div>
      </div>
    </main>
  );
}