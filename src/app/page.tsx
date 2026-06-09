import { signOut } from "@/auth";

export default function Home() {
  return (
    <main>
      <h1>Capytal</h1>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}
