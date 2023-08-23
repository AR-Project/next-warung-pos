import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Hello World</h1>
      <p>{JSON.stringify(session)}</p>
    </main>
  );
}
