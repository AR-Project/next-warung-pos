export interface IMenuItemsRepository {
  countByCategoryId: (payload: CategoryId) => Promise<number>;
  add: (payload: IAddMenuItemPayload) => Promise<ItemId>;
  getById: (payload: ItemId) => Promise<IMenuItemRow>;
  getByCategoryId: (payload: CategoryId) => Promise<IMenuItemRow[]>;
  updateSortOrder: (payload: IUpdateSortOrder[]) => Promise<void>;
  update: (payload: IUpdateMenuItem) => Promise<IMenuItemRow>;
  delete: (payload: ItemId) => Promise<void>;
}
