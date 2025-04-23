
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { currentUser, expenseCategories, mockExpenses, mockGroups } from "@/lib/mockData";
import { format } from "date-fns";
import { Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useState } from "react";
import { AddExpenseModal } from "@/components/expenses/AddExpenseModal";

export default function Expenses() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  // Get all expenses related to the current user
  const userExpenses = mockExpenses.filter(expense => 
    expense.paidBy.id === currentUser.id || 
    expense.paidFor.some(split => split.userId === currentUser.id)
  ).sort((a, b) => b.date.getTime() - a.date.getTime());
  
  // Helper function to get group name by ID
  const getGroupName = (groupId: string) => {
    const group = mockGroups.find(g => g.id === groupId);
    return group ? group.name : "Personal";
  };

  // Helper function to get category icon by name
  const getCategoryIcon = (categoryName: string) => {
    const category = expenseCategories.find(c => c.name === categoryName);
    return category ? category.icon : '📦';
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-splitwisely-primary hover:bg-splitwisely-secondary"
            onClick={() => setIsAddExpenseOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
          <CardDescription>
            View and manage all your shared expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userExpenses.map((expense) => {
              const isPayer = expense.paidBy.id === currentUser.id;
              const userSplit = expense.paidFor.find(
                split => split.userId === currentUser.id
              );
              
              let statusText;
              let statusClass;
              
              if (isPayer) {
                const unpaidCount = expense.paidFor.filter(s => s.userId !== currentUser.id && !s.paid).length;
                if (unpaidCount > 0) {
                  statusText = `${unpaidCount} people owe you`;
                  statusClass = "text-expense-green";
                } else {
                  statusText = "everyone paid";
                  statusClass = "text-muted-foreground";
                }
              } else if (userSplit) {
                if (userSplit.paid) {
                  statusText = "you paid";
                  statusClass = "text-muted-foreground";
                } else {
                  statusText = `you owe $${userSplit.amount.toFixed(2)}`;
                  statusClass = "text-expense-red";
                }
              }
              
              return (
                <div key={expense.id} className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-soft-purple rounded-full flex items-center justify-center text-lg">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{expense.title}</h4>
                        <Badge variant="outline" className="bg-soft-blue text-splitwisely-secondary">
                          {expense.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {getGroupName(expense.groupId || '')}
                        {" • "}
                        {format(expense.date, "MMM d, yyyy")}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <UserAvatar user={expense.paidBy} size="sm" />
                        <span className="ml-1">
                          {isPayer ? "You paid" : `${expense.paidBy.name} paid`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    <p className={`text-sm ${statusClass}`}>{statusText}</p>
                  </div>
                </div>
              );
            })}
            
            {userExpenses.length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No expenses found</p>
                <Button 
                  className="mt-2 bg-splitwisely-primary hover:bg-splitwisely-secondary"
                  onClick={() => setIsAddExpenseOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Expense
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <AddExpenseModal 
        open={isAddExpenseOpen} 
        onOpenChange={setIsAddExpenseOpen}
      />
    </MainLayout>
  );
}
