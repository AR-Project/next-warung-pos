import { getMenuAction } from "./action";

import { BackButton } from "@/presentation/component/BackButton";
import { DefaultButton } from "@/presentation/component/DefaultButton";
import MenuCategory from "./_component/MenuCategory";

export default async function Page() {
  const { data: menu } = await getMenuAction();

  return (
    <>
      <BackButton />
      <h1>Manage Menu Page</h1>
      <div className="flex flex-row gap-3">
        <DefaultButton href="./new-item" label="Create Item" />
        <DefaultButton href="./new-category" label="New Category" />
        <DefaultButton href="#TODO" label="Edit order" />
      </div>
      {!menu && <p>Start By create new Category</p>}
      {menu && (
        <div className="py-4">
          {menu.map((category) => (
            <MenuCategory category={category} key={category.id} />
          ))}
        </div>
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
