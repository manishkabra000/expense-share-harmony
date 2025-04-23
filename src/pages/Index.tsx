
import MainLayout from "@/components/layout/MainLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BalanceSummary } from "@/components/dashboard/BalanceSummary";
import { ExpenseList } from "@/components/dashboard/ExpenseList";
import { GroupsList } from "@/components/dashboard/GroupsList";
import { useState, useEffect } from "react";
import { AddExpenseModal } from "@/components/expenses/AddExpenseModal";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";  // Changed from Button to button, and used named import

export default function Index() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const openAddExpenseModal = () => {
    setIsAddExpenseOpen(true);
  };

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
      {!user && (
        <div className="flex justify-center py-6">
          <Button
            className="bg-splitwisely-primary"
            onClick={() => navigate("/auth")}
          >
            Log In to manage your expenses
          </Button>
        </div>
      )}
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
