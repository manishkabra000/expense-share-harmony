
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser, mockBalances } from "@/lib/mockData";

export function BalanceSummary() {
  const userBalance = mockBalances[currentUser.id];
  
  const totalOweAmount = Object.values(userBalance.owes).reduce((a, b) => a + b, 0);
  const totalOwedAmount = Object.values(userBalance.owed).reduce((a, b) => a + b, 0);
  const netBalance = totalOwedAmount - totalOweAmount;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            You owe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-red">
            ${totalOweAmount.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            You are owed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-green">
            ${totalOwedAmount.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-expense-green' : 'text-expense-red'}`}>
            ${Math.abs(netBalance).toFixed(2)}
            <span className="text-sm font-normal ml-1">
              {netBalance >= 0 ? 'in your favor' : 'you owe'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
