import Image from "next/image";
import { db } from "@/db";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
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
          <h1 className="mt-6 text-3xl font-semibold text-foreground">
            Create a Capytal Account
          </h1>
          <p className="mt-2 text-muted-foreground">Enter your info</p>
        </div>

        <div className="flex-1 p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border">
          <form
            action={async (formData) => {
              "use server";
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              const passwordHash = await bcrypt.hash(password, 12);
              await db.insert(users).values({ email, passwordHash });
              redirect("/login");
            }}
            className="flex flex-col h-full gap-4"
          >
            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
