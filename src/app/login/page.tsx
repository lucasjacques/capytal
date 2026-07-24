import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const { error, email } = await searchParams;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-card rounded-xl shadow-sm border border-border flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <Image
            src="/images/logo.png"
            alt="Capytal"
            width={128}
            height={128}
          />
          <p className="text-xl font-semibold text-foreground">Capytal</p>
          <h1 className="mt-6 text-3xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="flex-1 p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border">
          <form
            action={async (formData) => {
              "use server";
              try {
                await signIn("credentials", {
                  email: formData.get("email"),
                  password: formData.get("password"),
                  redirectTo: "/",
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  const email = formData.get("email") as string;
                  redirect(
                    `/login?error=invalid_credentials&email=${encodeURIComponent(email)}`,
                  );
                }
                throw error;
              }
            }}
            className="flex flex-col h-full gap-4"
          >
            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  defaultValue={email ?? ""}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive">
                Invalid email or password.
              </p>
            )}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
