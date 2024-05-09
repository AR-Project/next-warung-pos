import { z } from "zod";

type IAddMenuCategoryEntity = Required<IAddMenuCategory> &
  VerifyPayload<IAddMenuCategory>;

const DEFAULT_COLOR = "#1d4ed8"; // Blue

export default class AddMenuCategoryEntity implements IAddMenuCategoryEntity {
  ownerId: string;
  storeId: string;
  name: string;
  color: string;

  constructor(payload: IAddMenuCategory) {
    this._verifyPayload(payload);

    const { ownerId, storeId, name, color } = payload;
    this.ownerId = ownerId;
    this.storeId = storeId;
    this.name = name;
    this.color = color ? color : DEFAULT_COLOR;
  }

  _verifyPayload(payload: IAddMenuCategory): void {
    if (!payload) {
      throw new Error("ADD_MENU_CATEGORY.PAYLOAD_EMPTY");
    }

    const payloadSchema = z
      .object({
        ownerId: z.string(),
        storeId: z.string(),
        name: z.string().min(3),
        color: z.string().length(7),
      })
      .partial({
        color: true,
      });

    try {
      payloadSchema.parse(payload);
    } catch (error: any) {
      throw new Error("ADD_MENU_CATEGORY.INVALID_PAYLOAD");
    }
  }
}
