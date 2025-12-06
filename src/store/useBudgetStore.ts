import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BudgetData, BudgetState, SyncStatus } from '../types/budget';

interface BudgetStore extends BudgetState {
    updateField: (field: keyof BudgetData, value: number) => void;

    setSyncStatus: (status: SyncStatus) => void;

}

const initialState: BudgetData = {
    data: {
        income: 0,
        monthlyBills: 0,
        food: 0,
        transport: 0,
        subscriptions: 0,
        miscellaneous: 0,
    },
    status: 'local-only',
    LastUpdated: new Date().toISOString(),
};

export const useBudgetStore = create<BudgetStore>()(
    persist(
        (set) => ({
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
        }),
        {
            name: 'budget-box-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);