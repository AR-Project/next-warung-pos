export default interface IStoreRepository {
  addStore: (payload: IAddStore) => Promise<StoreId>;
  verifyStoreId: (payload: StoreId) => Promise<void>;
  getStoreInfo: (storeId: StoreId) => Promise<StoreInfo>;
  getStoresByUserId: (userId: string) => Promise<StoreInfo[]>;
}
