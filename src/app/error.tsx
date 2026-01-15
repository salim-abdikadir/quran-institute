"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center container px-4 text-center">
      <div className="space-y-8 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mb-6">
          <AlertCircle className="text-destructive w-10 h-10" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-muted-foreground leading-relaxed">
            An unexpected error occurred. We've been notified and are working to fix it.
            {error.digest && (
              <span className="block mt-2 text-xs font-mono bg-muted p-2 rounded-lg truncate">
                Error ID: {error.digest}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={() => reset()} 
            variant="default" 
            className="gap-2 rounded-xl shadow-lg shadow-primary/20"
          >
            <RefreshCcw size={18} />
            Try again
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-xl">
            <Link href="/">
              <Home size={18} />
              Go Home
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground/60 italic pt-8 border-t border-border/50">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}
