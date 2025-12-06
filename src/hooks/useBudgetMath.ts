import { useBudgetStore } from "../store/useBudgetStore";
import { useMemo } from "react";

export const useBudgetMath = () => {
    const { data } = useBudgetStore();

    const analytics = useMemo(() => {
        const { income, ...expenses } = data;
        const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
        const savings = income - totalExpenses;
        const burnRate = income > 0 ? (totalExpenses / income) * 100 : 0;
        
        const today = new Date();
        const currentDay = today.getDate();
        const dayInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        const predictedSpend = currentDay > 0
            ? (totalExpenses / currentDay) * dayInMonth
            : totalExpenses;

        const warnings: string[] = [];
        if (data.subscriptions > (income * 0.30)) {
            warnings.push("Subscription are > 30% of income! Consider cancelling apps.");
        }
        if (savings < 0) {
            warnings.push("Warning: You are spending more than you earn.");
        }
        
        return {
            totalExpenses,
            savings,
            burnRate,
            predictedSpend,
            warnings,
        };
    }, [data]);

    return analytics;
}