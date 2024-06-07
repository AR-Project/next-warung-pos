import { getCategoriesAction } from "./action";

import { BackButton } from "@/presentation/component/BackButton";
import { DefaultButton } from "@/presentation/component/DefaultButton";
import DeleteCategoryButton from "./DeleteCategoryButton";

type CategoryProps = IMenuCategoryInfo & {
  // TODO
};

async function MenuCategory(props: CategoryProps) {
  return (
    <div className="p-2 flex flex-row content-between justify-between">
      <div className="flex flex-row gap-2">
        <div
          style={{ backgroundColor: props.color }}
          className="h-auto w-1"
        ></div>
        {props.name}
      </div>
      <div className="flex flex-row">
        🔼🔽
        <DeleteCategoryButton categoryId={props.id} />
      </div>
    </div>
  );
}

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
        <div className="py-4">
          {result.data?.map((category) => (
            <MenuCategory {...category} key={category.id} />
          ))}
        </div>
      )}

      {/* TODO: Front-end display all categories with each menu */}
    </>
  );
}

export const dynamic = "force-dynamic";
