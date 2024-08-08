import DeleteCategoryButton from "./DeleteCategoryButton";
import MenuItem from "./MenuItem";

type CategoryProps = {
  category: CategoryWithItemChildren;
};

export default async function MenuCategory({ category }: CategoryProps) {
  const { children: items } = category;

  return (
    <div className="c-category-items-container" key={category.id}>
      <div className="c-category-name-container p-2 flex flex-row content-between justify-between">
        <div className="flex flex-row gap-2">
          <div
            style={{ backgroundColor: category.color }}
            className="h-auto w-1"
          ></div>
          {category.name}
        </div>
        <div className="flex flex-row">
          <DeleteCategoryButton categoryId={category.id} />
        </div>
      </div>
      <div className="c-items-container pl-5">
        {items.length === 0 && (
          <p className="text-gray-400 text-sm italic">Empty</p>
        )}
        {items.length > 0 &&
          items.map((item) => <MenuItem item={item} key={item.id} />)}
      </div>
    </div>
  );
}
