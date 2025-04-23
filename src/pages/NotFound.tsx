
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-splitwisely-primary mb-4">404</h1>
      <p className="text-2xl font-medium mb-6">Page not found</p>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! It seems like the page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-splitwisely-primary hover:bg-splitwisely-secondary">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
