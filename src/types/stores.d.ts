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
    createdAt: Date;
    modifiedAt: Date;
    /**
     * ROADMAP in future, all of store information here. Ex. Address, phone number, etc.
     *
     * This is just MVP.
     */
  };
}
