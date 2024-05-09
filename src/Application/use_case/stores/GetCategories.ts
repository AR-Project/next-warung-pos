/**
 * Payload is user Id,
 * Return value is Everything in array. ALL Categories with its own menu below. ARRAY.
 */

import { inject, injectable } from "tsyringe";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";

@injectable()
export default class GetCategoriesUseCase {
  _userRepository: IUserRepository;
  _storeRepository: IStoreRepository;
  _logRepository: ILogRepository;
  _menuCategoryRepository: IMenuCategoriesRepository;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository,
    @inject("ILogRepository") logRepository: ILogRepository,
    @inject("IStoreRepository") storeRepository: IStoreRepository,
    @inject("IMenuCategoryRepository")
    menuCategoryRepository: IMenuCategoriesRepository
  ) {
    this._userRepository = userRepository;
    this._storeRepository = storeRepository;
    this._logRepository = logRepository;
    this._menuCategoryRepository = menuCategoryRepository;
  }

  async execute(payload: StoreId): Promise<IMenuCategoryInfo[]> {
    await this._storeRepository.verifyStoreId(payload);

    await this._logRepository.log({
      task: "fetched all category from a store",
      storeId: payload,
    });

    return await this._menuCategoryRepository.getAllInfoByStoreId(payload);
  }
}
