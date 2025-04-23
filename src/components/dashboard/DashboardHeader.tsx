
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { currentUser } from "@/lib/mockData";

interface DashboardHeaderProps {
  onAddExpense?: () => void;
}

export function DashboardHeader({ onAddExpense }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground">
          Manage your expenses and settle up with friends
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          className="bg-splitwisely-primary hover:bg-splitwisely-secondary"
          onClick={onAddExpense}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>
    </div>
  );
}
