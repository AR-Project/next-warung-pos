export interface IMenuCategoriesRepository {
  getCategoriesCountByStoreId: (storeId: StoreId) => Promise<number>;
  addMenuCategory: (payload: Required<IAddMenuCategory>) => Promise<CategoryId>;
  getMenuCategoryInfo: (payload: CategoryId) => Promise<IMenuCategoryRow>;
  getAllCategoriesIdsByStoreId: (storeId: StoreId) => Promise<string[]>;
  getAllInfoByStoreId: (storeId: StoreId) => Promise<IMenuCategoryRow[]>;
  updateMenuCategory: (
    payload: IUpdateMenuCategory
  ) => Promise<IMenuCategoryRow>;
  updateCategorySortOrder: (payload: IUpdateSortOrder[]) => Promise<void>;
  deleteMenuCategory: (payload: CategoryId) => Promise<void>;
}
