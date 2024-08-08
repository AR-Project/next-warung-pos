import { inject, injectable } from "tsyringe";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";

import type { IMenuItemsRepository } from "@/Domains/menuItem/IMenuItemRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import InvariantError from "@/Commons/exceptions/InvariantError";

@injectable()
export default class DeleteItemUseCase {
  _userRepository: IUserRepository;
  _storeRepository: IStoreRepository;
  _logRepository: ILogRepository;
  _menuCategoryRepository: IMenuCategoriesRepository;
  _menuItemsRepository: IMenuItemsRepository;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository,
    @inject("ILogRepository") logRepository: ILogRepository,
    @inject("IStoreRepository") storeRepository: IStoreRepository,
    @inject("IMenuCategoryRepository")
    menuCategoryRepository: IMenuCategoriesRepository,
    @inject("IMenuItemsRepository") menuItemsRepository: IMenuItemsRepository
  ) {
    this._userRepository = userRepository;
    this._storeRepository = storeRepository;
    this._logRepository = logRepository;
    this._menuCategoryRepository = menuCategoryRepository;
    this._menuItemsRepository = menuItemsRepository;
  }

  async execute(payload: { userId: string; itemId: string }): Promise<void> {
    const { userId, itemId } = payload;

    try {
      await Promise.all([
        this._userRepository.verifyUserId(userId),
        this._menuItemsRepository.getById(itemId),
      ]);
    } catch (error) {
      throw new InvariantError(
        "user id or item id or category id is not valid"
      );
    }

    await this._menuItemsRepository.delete(itemId);

    await this._logRepository.log({
      task: "item Deleted",
      userId,
      targetId: itemId,
    });
  }
}
