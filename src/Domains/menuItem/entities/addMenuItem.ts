import { z, ZodError } from "zod";

type IAddMenuItemEntities = Required<IAddMenuItemPayload> &
  VerifyPayload<IAddMenuItemPayload>;

const DEFAULT_COLOR = "#1d4ed8";
const DEFAULT_IMAGE_URL = "todo";

export default class AddMenuItem implements IAddMenuItemEntities {
  userId: string;
  storeId: string;
  categoryId: string;
  name: string;
  color: string;
  price: number;
  imageUrl: string;

  constructor(payload: IAddMenuItemPayload) {
    this._verifyPayload(payload);
    const { userId, storeId, categoryId, name, color, price, imageUrl } =
      payload;
    this.userId = userId;
    this.categoryId = categoryId;
    this.storeId = storeId;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl ? imageUrl : DEFAULT_IMAGE_URL;
    this.color = color ? color : DEFAULT_COLOR;
  }

  _verifyPayload(payload: IAddMenuItemPayload): void {
    if (!payload) {
      throw new Error("ADD_MENU_ITEM.PAYLOAD_EMPTY");
    }

    const payloadSchema = z
      .object({
        userId: z.string(),
        storeId: z.string(),
        categoryId: z.string(),
        name: z.string().min(3),
        color: z.string().length(7),
        price: z.number(),
        imageUrl: z.string(),
      })
      .partial({
        color: true,
        imageUrl: true,
      });

    try {
      payloadSchema.parse(payload);
    } catch (error: any) {
      throw new Error("ADD_MENU_ITEM.INVALID_PAYLOAD");
    }
  }
}
