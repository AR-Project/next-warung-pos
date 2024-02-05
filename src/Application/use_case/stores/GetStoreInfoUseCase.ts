import { inject, injectable } from "tsyringe";

import type IStoreRepository from "@/Domains/stores/IStoreRepository";

@injectable()
export default class GetStoreInfoUseCase {
  _storeRepository: IStoreRepository;

  constructor(@inject("IStoreRepository") storeRepository: IStoreRepository) {
    this._storeRepository = storeRepository;
  }

  async execute(payload: string): Promise<StoreInfo> {
    const result = await this._storeRepository.getStoreInfo(payload);

    return result;
  }
}
