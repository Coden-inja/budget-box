'use client';
import { useBudgetStore } from '@/store/useBudgetStore';

export default function BudgetForm() {
  const { data, updateField } = useBudgetStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as any, parseFloat(value) || 0);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
        <span className="text-xl">📝</span>
        <h2 className="text-lg font-bold text-slate-700">Monthly Budget</h2>
      </div>
      
      {/* FIX: Changed from 'space-y-5' to 'grid-cols-2' to make the card wider and shorter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(data).map((key) => (
          <div key={key} className="group">
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
              <input
                type="number"
                name={key}
                value={data[key as keyof typeof data] || ''}
                onChange={handleChange}
                // Compact padding (py-2) to reduce height further
                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-dashed border-slate-100 text-center">
        <p className="text-[10px] text-slate-400 font-medium">
          ✨ Auto-saving enabled
        </p>
      </div>
    </div>
  );
}