import InvariantError from "@/Commons/exceptions/InvariantError";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import type IUserRepository from "@/Domains/users/IUserRepository";
import { inject, injectable } from "tsyringe";

type AddStoreUseCasePayload = IAddStore;

@injectable()
export default class AddStoreUseCase {
  _userRepository: IUserRepository;
  _storeRepository: IStoreRepository;
  _logRepository: ILogRepository;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository,
    @inject("ILogRepository") logRepository: ILogRepository,
    @inject("IStoreRepository") storeRepository: IStoreRepository
  ) {
    this._userRepository = userRepository;
    this._logRepository = logRepository;
    this._storeRepository = storeRepository;
  }

  async execute(useCasePayload: AddStoreUseCasePayload): Promise<StoreId> {
    const { ownerId } = useCasePayload;
    this._userRepository.verifyUserId(ownerId);
    const storeId = await this._storeRepository.addStore(useCasePayload);

    await this._logRepository.log({
      userId: ownerId,
      storeId: storeId,
      task: "create store",
    });

    return storeId;
  }
}
