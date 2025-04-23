
import MainLayout from "@/components/layout/MainLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BalanceSummary } from "@/components/dashboard/BalanceSummary";
import { ExpenseList } from "@/components/dashboard/ExpenseList";
import { GroupsList } from "@/components/dashboard/GroupsList";
import { useState, useEffect } from "react";
import { AddExpenseModal } from "@/components/expenses/AddExpenseModal";

export default function Index() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const openAddExpenseModal = () => {
    setIsAddExpenseOpen(true);
  };
  
  // Listen for the custom event from the sidebar
  useEffect(() => {
    const handleOpenExpenseModal = () => {
      setIsAddExpenseOpen(true);
    };
    
    window.addEventListener('open-add-expense', handleOpenExpenseModal);
    
    return () => {
      window.removeEventListener('open-add-expense', handleOpenExpenseModal);
    };
  }, []);

  return (
    <MainLayout>
      <DashboardHeader onAddExpense={openAddExpenseModal} />
      
      <div className="space-y-6">
        <BalanceSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpenseList />
          <GroupsList />
        </div>
      </div>
      
      <AddExpenseModal 
        open={isAddExpenseOpen} 
        onOpenChange={setIsAddExpenseOpen}
      />
    </MainLayout>
  );
}
