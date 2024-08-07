export interface IMenuItemsRepository {
  countByCategoryId: (payload: CategoryId) => Promise<number>;
  add: (payload: Required<IAddMenuItemPayload>) => Promise<ItemId>;
  getById: (payload: ItemId) => Promise<IMenuItemRow>;
  getByCategoryId: (payload: CategoryId) => Promise<IMenuItemRow[]>;
  getByCategoryIds: (ids: CategoryId[]) => Promise<IMenuItemRow[]>;
  updateSortOrder: (payload: IUpdateSortOrder[]) => Promise<void>;
  update: (payload: IUpdateMenuItem) => Promise<IMenuItemRow>;
  delete: (payload: ItemId) => Promise<void>;
}
