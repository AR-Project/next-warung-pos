export {};

declare global {
  type IAddStore = {
    userId: string;
    name: string;
  };

  type StoreId = string;

  type StoreInfo = {
    name: string;
    id: StoreId;
    userId: string;
    createdAt: string;
    modifiedAt: string;
  };

  type IStoreRow = {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    modifiedAt: string;
  };
}
