import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function createUser(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(users).values({ email, passwordHash });
}

export async function verifyCredentials(email: string, password: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!result[0]) return null;

  const passwordMatch = await bcrypt.compare(password, result[0].passwordHash);
  if (!passwordMatch) return null;

  return { id: String(result[0].id), email: result[0].email };
}
