import { getStoreInfo } from "@/Commons/action/storeAction";

type Props = {
  storeId: string;
};

export default async function StoreInfo({ storeId }: Props) {
  const { data: store } = await getStoreInfo(storeId);
  console.log(store);

  return <div>🛒{store?.name}</div>;
}
