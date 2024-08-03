import { BackButton } from "@/presentation/component/BackButton";
import { DefaultButton } from "@/presentation/component/DefaultButton";

type props = {
  params: { storeId: string };
};

export default async function Manage({ params }: props) {
  return (
    <>
      <BackButton />
      <h1>Manage Store</h1>
      <p>Active store: {params.storeId}</p>
      <DefaultButton href="./menu" label="Manage Menu"></DefaultButton>
      {/* FUTURE: Frontend List store realtime information, e.g. total transaction, payment type, item sold */}
    </>
  );
}
