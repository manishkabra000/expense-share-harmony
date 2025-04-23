
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { mockGroups } from "@/lib/mockData";
import { Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Groups() {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Groups</h1>
        <Button className="bg-splitwisely-primary hover:bg-splitwisely-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>
      
      {mockGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGroups.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="block"
            >
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {group.avatarUrl ? (
                  <div className="aspect-video w-full">
                    <img
                      src={group.avatarUrl}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-splitwisely-primary/20 flex items-center justify-center">
                    <Users className="h-12 w-12 text-splitwisely-primary" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  {group.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                      {group.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm text-muted-foreground">
                      {group.members.length} members
                    </div>
                    <div className="text-sm font-medium text-splitwisely-primary">
                      {group.expenses.length} expenses
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Groups Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create a group to start tracking expenses with friends
          </p>
          <Button className="bg-splitwisely-primary hover:bg-splitwisely-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Create First Group
          </Button>
        </div>
      )}
    </MainLayout>
  );
}
