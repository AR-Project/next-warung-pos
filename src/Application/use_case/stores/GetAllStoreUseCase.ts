import InvariantError from "@/Commons/exceptions/InvariantError";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import type IUserRepository from "@/Domains/users/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetStoresUseCase {
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

  async execute(payload: UserId): Promise<StoreInfo[]> {
    const result = await this._storeRepository.getStoresByUserId(payload);

    await this._logRepository.log({
      userId: payload,
      task: "fetch stores",
    });
    return result;
  }
}
