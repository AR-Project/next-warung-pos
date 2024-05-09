export {};

declare global {
  type CategoryId = string;

  type IAddMenuCategory = {
    ownerId: string; // TODO: Should be named `userId` for consistency
    storeId: string;
    name: string;
    color?: string; // use inline style on UI
  };

  type IUpdateMenuCategory = Partial<IAddMenuCategory> & {
    id: CategoryId;
  };

  type IUpdateMenuCategorySortOrder = {
    id: string;
    sortOrder: number;
  };

  type IMenuCategoryInfo = {
    id: string;
    userId: string;
    storeId: string;
    name: string;
    color: string;
    sortOrder: number;
    createdAt: string;
    modifiedAt: string;
    isDeleted: boolean;
  };
}
