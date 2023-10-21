import ClientSide from "@/presentation/component/ClientSide";
import ServerSide from "@/presentation/component/ServerSide";

export default function Page() {
  return (
    <div>
      <ServerSide />
      <ClientSide />
    </div>
  );
}
