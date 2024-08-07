import { BackButton } from "@/presentation/component/BackButton";
import { DefaultButton } from "@/presentation/component/DefaultButton";

type props = {
  params: { storeId: string };
};

export default async function Manage({ params }: props) {
  return (
    <div className="flex flex-col gap-2">
      <BackButton />
      <div className="flex flex-row gap-4 items-baseline">
        <h1>Manage Store</h1>
        <p className="text-xs text-gray-700">Current Store: {params.storeId}</p>
      </div>
      <DefaultButton href="./menu" label="Manage Menu"></DefaultButton>
      {/* FUTURE: Frontend List store realtime information, e.g. total transaction, payment type, item sold */}
    </div>
  );
}
