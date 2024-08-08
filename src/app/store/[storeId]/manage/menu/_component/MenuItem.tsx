import DeleteMenuItemButton from "./DeleteMenuItemButton";

type Props = {
  item: IMenuItemRow;
};

export default function MenuItem({ item }: Props) {
  const { name, id } = item;

  return (
    <div className="c-item-container flex flex-row justify-between pr-2 hover:bg-gray-700 ">
      <div className="c-item-name">{name}</div>
      <DeleteMenuItemButton id={id} />
    </div>
  );
}
