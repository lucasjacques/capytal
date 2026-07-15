import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Client } from "pg";

dotenvExpand.expand(dotenv.config({ path: ".env" }));

export default async function globalSetup() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query("DELETE FROM users WHERE email LIKE '%@capytal.test'");
  await client.end();
}
