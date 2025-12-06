import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BudgetData, BudgetState, SyncStatus } from '../types/budget';

interface BudgetStore extends BudgetState {
  updateField: (field: keyof BudgetData, value: number) => void;
  setSyncStatus: (status: SyncStatus) => void;
  syncToServer: () => Promise<void>;
}


const initialState: BudgetState = {
  data: {
    income: 0,
    monthlyBills: 0,
    food: 0,
    transport: 0,
    subscriptions: 0,
    miscellaneous: 0,
  },
  status: 'local-only',
  lastUpdated: new Date().toISOString(), 
};

export const useBudgetStore = create<BudgetStore>()(
  persist(
    
    (set, get) => ({
      ...initialState,

      updateField: (field, value) => set((state) => ({
        data: {
          ...state.data,
          [field]: value,
        },
        status: 'sync-pending',
        lastUpdated: new Date().toISOString(),
      })),

      setSyncStatus: (status) => set({ status }),

      // FIX 3: Moved syncToServer INSIDE the store object
      syncToServer: async () => {
        const state = get(); // Now this works because we asked for 'get' above
        
        // If we are already synced, don't waste network calls
        if (state.status === 'synced') return;

        try {
          const response = await fetch('/api/budget/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: state.data }),
          });

          if (response.ok) {
            set({ status: 'synced', lastUpdated: new Date().toISOString() });
          } else {
            console.error('Server refused sync');
          }
        } catch (error) {
          console.error('Network error, keeping data local');
        }
      },
    }),
    {
      name: 'budget-box-storage',
      // FIX 4: Server-Safe Storage Check
      // This prevents the "localStorage is not defined" error during Next.js build
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return { // Dummy storage for server
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage; // Real storage for browser
      }),
    }
  )
);