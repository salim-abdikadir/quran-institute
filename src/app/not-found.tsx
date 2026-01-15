import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center container px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto animate-in zoom-in duration-500">
        <div className="relative">
          <h1 className="text-9xl font-black text-primary/10 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background p-4 rounded-2xl border border-border">
              <span className="text-4xl font-bold bg-gradient-to-br from-primary to-primary-foreground bg-clip-text text-transparent">
                Lost in Space?
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Oops! Page not found</h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you are looking for might have been moved, deleted, or simply doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="outline" className="gap-2 rounded-xl">
            <Link href="javascript:history.back()">
              <ArrowLeft size={18} />
              Go Back
            </Link>
          </Button>
          <Button asChild className="gap-2 rounded-xl shadow-lg shadow-primary/20">
            <Link href="/">
              <Home size={18} />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
