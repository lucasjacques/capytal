import { db } from "@/db";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default function RegisterPage() {
  return (
    <main>
      <h1>Create account</h1>
      <form
        action={async (formData) => {
          "use server";
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

          const passwordHash = await bcrypt.hash(password, 12);

          await db.insert(users).values({ email, passwordHash });

          redirect("/login");
        }}
      >
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}
