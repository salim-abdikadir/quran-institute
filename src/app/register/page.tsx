import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { MemberRegistrationForm } from "@/components/forms/member-registration-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";

export default async function RegisterPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  const existingProfile = await api.member.getProfile();
  
  if (existingProfile) {
    redirect("/events");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl shadow-lg border-primary/10">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Become a Member</CardTitle>
          <CardDescription className="text-base">
            Join Jimciyat Alquran and be part of our growing community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MemberRegistrationForm initialData={{
            fullName: session.user.name ?? "",
            address: "",
            phoneNumber: "",
            ageGroup: "",
            educationLevel: "",
            employmentStatus: "",
            employmentTitle: "",
          }} />
        </CardContent>
      </Card>
    </main>
  );
}
