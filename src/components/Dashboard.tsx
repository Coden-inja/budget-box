'use client';
import { useBudgetStore } from '../store/useBudgetStore';
import { useBudgetMath } from '../hooks/useBudgetMath';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
    const { totalExpenses, savings, burnRate, predictedSpend, warnings } = useBudgetMath();
    const { data } = useBudgetStore();

    const chartData = [
        { name: 'Bills', value: data.monthlyBills, color: '#FF8042' },
        { name: 'Food', value: data.food, color: '#00C49F' },
        { name: 'Transport', value: data.transport, color: '#FFBB28'    },
        { name: 'Subs', value: data.subscriptions, color: '#0088FE'  },
        { name: 'Misc', value: data.miscellaneous, color: '#8884d8'},
    ].filter(item => item.value > 0);

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      
      {/* 1. Key Metrics Cards */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Savings Potential</h3>
        <p className={`text-3xl font-bold ${savings < 0 ? 'text-red-500' : 'text-green-600'}`}>
          ${savings.toFixed(2)}
        </p>
        <div className="mt-4">
          <h3 className="text-gray-500 text-sm font-bold uppercase">Burn Rate</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
            <div 
              className={`h-4 rounded-full ${burnRate > 100 ? 'bg-red-500' : 'bg-blue-500'}`} 
              style={{ width: `${Math.min(burnRate, 100)}%` }} // Cap width at 100% for CSS
            ></div>
          </div>
          <p className="text-right text-xs mt-1">{burnRate.toFixed(1)}% of Income</p>
        </div>
      </div>

      {/* 2. Visualization (Pie Chart) [cite: 24] */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[200px]">
        <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Spend Breakdown</h3>
        {chartData.length > 0 ? (
          <div className="w-full h-48">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie 
                   data={chartData} 
                   cx="50%" cy="50%" 
                   innerRadius={40} 
                   outerRadius={60} 
                   dataKey="value"
                 >
                   {chartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Add expenses to see chart</p>
        )}
      </div>

      {/* 3. Prediction & Warnings */}
      <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
           <span className="font-semibold text-gray-700">Month-End Prediction:</span>
           <span className="font-mono text-lg">${predictedSpend.toFixed(2)}</span>
        </div>
        
        {/* Anomaly Warnings  */}
        {warnings.length > 0 && (
          <div className="mt-2 space-y-1">
            {warnings.map((msg, idx) => (
              <div key={idx} className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded flex items-center">
                ⚠ {msg}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}