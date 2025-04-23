
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockExpenses, mockUsers } from "@/lib/mockData";
import { currentUser } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { UserAvatar } from "../ui/UserAvatar";

export function ExpenseList() {
  // Get expenses involving the current user (either paid by or paid for)
  const relevantExpenses = mockExpenses.filter(expense => {
    return expense.paidBy.id === currentUser.id || 
      expense.paidFor.some(split => split.userId === currentUser.id);
  }).sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  
  // Get the name of the user by ID
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relevantExpenses.length > 0 ? (
          relevantExpenses.map(expense => {
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
                statusText = "you owe";
                statusClass = "text-expense-red";
              }
            }
            
            return (
              <div key={expense.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <UserAvatar user={expense.paidBy} size="sm" />
                  <div>
                    <h4 className="font-medium">{expense.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {isPayer ? "You paid" : `${expense.paidBy.name} paid`}
                      {" • "}
                      {formatDistanceToNow(expense.date, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${expense.amount.toFixed(2)}</p>
                  <p className={`text-sm ${statusClass}`}>{statusText}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground py-4">No recent expenses</p>
        )}
      </CardContent>
    </Card>
  );
}
