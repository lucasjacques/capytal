import "@/test/integration-setup";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUser, verifyCredentials } from "@/lib/auth-service";

const TEST_EMAIL = "test@capytal.test";
const TEST_PASSWORD = "password123";

afterEach(async () => {
  await db.delete(users).where(eq(users.email, TEST_EMAIL));
});

describe("createUser", () => {
  it("creates a user with a hashed password", async () => {
    await createUser(TEST_EMAIL, TEST_PASSWORD);

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, TEST_EMAIL))
      .limit(1);

    expect(result[0]).toBeDefined();
    expect(result[0].email).toBe(TEST_EMAIL);
    expect(result[0].passwordHash).not.toBe(TEST_PASSWORD);
  });

  it("rejects duplicate email", async () => {
    await createUser(TEST_EMAIL, TEST_PASSWORD);
    await expect(createUser(TEST_EMAIL, TEST_PASSWORD)).rejects.toThrow();
  });
});

describe("verifyCredentials", () => {
  beforeEach(async () => {
    await createUser(TEST_EMAIL, TEST_PASSWORD);
  });

  it("returns user for valid credentials", async () => {
    const user = await verifyCredentials(TEST_EMAIL, TEST_PASSWORD);

    expect(user).not.toBeNull();
    expect(user?.email).toBe(TEST_EMAIL);
  });

  it("returns null for wrong password", async () => {
    const user = await verifyCredentials(TEST_EMAIL, "wrongpassword");
    expect(user).toBeNull();
  });

  it("returns null for unknown email", async () => {
    const user = await verifyCredentials("unknown@capytal.test", TEST_PASSWORD);
    expect(user).toBeNull();
  });
});
