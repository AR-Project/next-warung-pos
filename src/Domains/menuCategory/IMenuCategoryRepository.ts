export interface IMenuCategoriesRepository {
  getCategoriesCountByStoreId: (storeId: StoreId) => Promise<number>;
  addMenuCategory: (payload: Required<IAddMenuCategory>) => Promise<CategoryId>;
  getMenuCategoryInfo: (payload: CategoryId) => Promise<IMenuCategoryInfo>;
  getAllCategoriesIdsByStoreId: (storeId: StoreId) => Promise<string[]>;
  getAllInfoByStoreId: (storeId: StoreId) => Promise<IMenuCategoryInfo[]>;
  updateMenuCategory: (
    payload: IUpdateMenuCategory
  ) => Promise<IMenuCategoryInfo>;
  updateCategorySortOrder: (
    payload: IUpdateMenuCategorySortOrder[]
  ) => Promise<void>;
  deleteMenuCategory: (payload: CategoryId) => Promise<void>;
}
