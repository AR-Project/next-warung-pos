import { getCategoriesAction } from "./action";

import { BackButton } from "@/presentation/component/BackButton";
import { DefaultButton } from "@/presentation/component/DefaultButton";

export default async function Page() {
  const result = await getCategoriesAction();

  return (
    <>
      <BackButton></BackButton>
      <h1>Manage Menu Page</h1>
      <div className="flex flex-row gap-3">
        <DefaultButton href="./new-item" label="Add" />
        <DefaultButton href="./new-category" label="New Category" />
      </div>

      {result.data !== undefined && (
        <ol>
          {result.data?.map((category) => (
            <li style={{ color: category.color }} key={category.id}>
              {category.name}
            </li>
          ))}
        </ol>
      )}

      {/* TODO: Front-end display all categories with each menu */}
    </>
  );
}

export const dynamic = "force-dynamic";
