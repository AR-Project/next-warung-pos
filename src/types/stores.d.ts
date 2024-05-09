export {};

declare global {
  type IAddStore = {
    ownerId: string;
    name: string;
  };

  type StoreId = string;

  type StoreInfo = {
    name: string;
    id: StoreId;
    ownerId: string;
    createdAt: string;
    modifiedAt: string;
  };

  type IStoreRow = {
    id: string;
    name: string;
    ownerId: string;
    createdAt: string;
    modifiedAt: string;
  };
}
