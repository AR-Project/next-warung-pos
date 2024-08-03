import { ZodError, z } from "zod";
type IAddstoreEntities = IAddStore & VerifyPayload<IAddStore>;

export default class AddStore implements IAddstoreEntities {
  userId: string;
  name: string;

  constructor(payload: IAddStore) {
    this._verifyPayload(payload);

    const { userId, name } = payload;
    this.userId = userId;
    this.name = name;
  }

  _verifyPayload(payload: IAddStore): void {
    if (!payload) {
      throw new Error("ADD_STORE.PAYLOAD_EMPTY");
    }

    const payloadSchema = z
      .object({
        userId: z.string(),
        name: z.string().min(5).max(10),
      })
      .required();

    try {
      payloadSchema.parse(payload);
    } catch (error) {
      throw new Error("ADD_STORE.INVALID_PAYLOAD");
    }
  }
}
