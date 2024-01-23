import InvariantError from "@/Commons/exceptions/InvariantError";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import type IUserRepository from "@/Domains/users/IUserRepository";
import { inject, injectable } from "tsyringe";

type AddStoreUseCasePayload = IAddStore;

@injectable()
export default class AddStoreUseCase {
  _userRepository: IUserRepository;
  _storeRepository: IStoreRepository;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository,
    @inject("IStoreRepository") storeRepository: IStoreRepository
  ) {
    this._userRepository = userRepository;
    this._storeRepository = storeRepository;
  }

  async execute(useCasePayload: AddStoreUseCasePayload): Promise<StoreId> {
    const { ownerId } = useCasePayload;
    this._userRepository.verifyUserId(ownerId);
    const storeId = this._storeRepository.addStore(useCasePayload);

    return storeId;
  }
}
