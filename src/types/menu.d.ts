export {};

declare global {
  /**
   * MENU GLOBAL TYPES
   */

  type IUpdateSortOrder = {
    id: string;
    sortOrder: number;
  };

  /**
   * CATEGORY TYPES
   */

  type CategoryId = string;

  type IAddMenuCategory = {
    userId: string;
    storeId: string;
    name: string;
    color?: string; // use inline style on UI
  };

  type IUpdateMenuCategory = Partial<IAddMenuCategory> & {
    id: CategoryId;
  };

  type IMenuCategoryRow = {
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

  type IMenuCategoryInfo = IMenuCategoryRow;

  /**
   * ITEM TYPES
   */

  type ItemId = string;

  type IMenuItemRow = {
    id: string;
    userId: string;
    storeId: string;
    categoryId: string;
    name: string;
    imageUrl: string | null;
    color: string;
    price: number;
    sortOrder: number;
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: string;
    modifiedAt: string;
  };

  type IAddMenuItemPayload = {
    userId: string;
    storeId: string;
    categoryId: string;
    name: string;
    color?: string;
    price: number;
    imageUrl?: string;
  };

  type IUpdateMenuItem = Partial<IAddMenuItemPayload> & {
    id: ItemId;
  };
}
