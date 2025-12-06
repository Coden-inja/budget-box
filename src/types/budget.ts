export interface BudgetData {
    income: number;
    monthlyBills: number;
    food: number;
    transport: number;
    subscriptions: number;
    miscellaneous: number;
}

export type SyncStatus = 'local-only' | 'sync-pending' | 'synced';

export interface BudgetState {
    data: BudgetData;
    status: SyncStatus;
    lastSynced: string;

}