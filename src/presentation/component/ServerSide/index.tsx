import getAppSession from "@/presentation/utils/getAppSession";

export default async function ServerSide() {
  const session = await getAppSession();
  console.log({ session });

  return (
    <div className="border border-green-500">
      <h1>ServerSide</h1>
      <div>{session && `${session.user.id} -- ${session.user.name}`}</div>
    </div>
  );
}
