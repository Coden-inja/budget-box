'use client'; 
import { useBudgetStore } from '../store/useBudgetStore';

export default function BudgetForm() {

  const { data, updateField } = useBudgetStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    updateField(name as any, parseFloat(value) || 0);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Monthly Budget</h2>
      
      {/* We map through fields to avoid repetitive code */}
      <div className="space-y-4">
        {Object.keys(data).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize text-gray-700 font-medium mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()} {/* Adds space before caps */}
            </label>
            <input
              type="number"
              name={key}
              value={data[key as keyof typeof data] || ''}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
            />
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Changes save automatically to your device.
      </p>
    </div>
  );
}