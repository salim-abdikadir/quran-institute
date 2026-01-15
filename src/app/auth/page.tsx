import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { AuthForms } from "@/components/auth/auth-forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AuthPage() {
  const session = await getSession();

  if (session) {
    redirect("/register");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 p-4 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <Card className="w-full max-w-md shadow-2xl border-primary/10 rounded-[2.5rem] relative z-10 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pt-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 rotate-3">
             <div className="w-8 h-8 rounded-full border-2 border-primary border-t-accent animate-spin-slow" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">Welcome</CardTitle>
          <CardDescription className="text-sm font-medium px-4">
            Join the Jimciyat Alquran community and embark on a journey of wisdom.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10">
          <AuthForms />
        </CardContent>
      </Card>
    </main>
  );
}
