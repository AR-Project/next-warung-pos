import { ZodError, z } from "zod";
type IAddstoreEntities = IAddStore & VerifyPayload<IAddStore>;

export default class AddStore implements IAddstoreEntities {
  ownerId: string;
  name: string;

  constructor(payload: IAddStore) {
    this._verifyPayload(payload);

    const { ownerId, name } = payload;
    this.ownerId = ownerId;
    this.name = name;
  }

  _verifyPayload(payload: IAddStore): void {
    if (!payload) {
      throw new Error("ADD_STORE.PAYLOAD_EMPTY");
    }

    const payloadSchema = z
      .object({
        ownerId: z.string(),
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
