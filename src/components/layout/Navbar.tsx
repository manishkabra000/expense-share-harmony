
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../ui/UserAvatar";
import { currentUser } from "@/lib/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <h1
            className="text-2xl font-bold text-splitwisely-primary cursor-pointer"
            onClick={() => navigate("/")}
          >
            Splitwisely
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          {user ? (
            <>
              <UserAvatar user={{ id: user.id, name: user.email ?? "", avatarUrl: undefined, email: user.email ?? "" }} size="sm" />
              <Button variant="outline" size="sm" onClick={logout}>
                Log Out
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/auth")}
            >
              Log In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
