import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Capytal" width={36} height={36} />
          <span className="font-semibold text-foreground">Capytal</span>
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome to Capytal
          </h1>
          <p className="text-muted-foreground">
            Your portfolio dashboard is coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
