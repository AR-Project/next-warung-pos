export default interface IStoreRepository {
  addStore: (payload: IAddStore) => Promise<StoreId>;
  getStoreInfo: (storeId: StoreId) => Promise<StoreInfo>;
  getStoresByUserId: (userId: string) => Promise<StoreInfo[]>;
}
