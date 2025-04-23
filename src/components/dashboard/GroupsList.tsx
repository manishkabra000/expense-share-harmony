
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockGroups } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function GroupsList() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Your Groups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockGroups.map(group => (
          <Link
            key={group.id}
            to={`/groups/${group.id}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              {group.avatarUrl ? (
                <img
                  src={group.avatarUrl}
                  alt={group.name}
                  className="rounded-md w-10 h-10 object-cover"
                />
              ) : (
                <div className="bg-splitwisely-primary/20 text-splitwisely-primary rounded-md w-10 h-10 flex items-center justify-center font-bold">
                  {group.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h4 className="font-medium">{group.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {group.members.length} members
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-soft-purple text-splitwisely-primary">
              {group.expenses.length} expenses
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
