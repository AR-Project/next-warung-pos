import { inject, injectable } from "tsyringe";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import AddMenuCategoryEntity from "@/Domains/menuCategory/entities/addMenuCategory";
import type { IMenuItemsRepository } from "@/Domains/menuItem/IMenuItemRepository";
import AddMenuItem from "@/Domains/menuItem/entities/addMenuItem";

type AddMenuItemsUsecasePayload = IAddMenuItemPayload;

@injectable()
export default class AddMenuItemUseCase {
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

  async execute(payload: AddMenuItemsUsecasePayload): Promise<ItemId> {
    const { userId, storeId, categoryId } = payload;

    await Promise.all([
      this._userRepository.verifyUserId(userId),
      this._storeRepository.verifyStoreId(storeId),
      this._menuCategoryRepository.verifyId(categoryId),
    ]);

    const categoryPayload = new AddMenuItem(payload);

    const itemId = await this._menuItemsRepository.add(categoryPayload);

    await this._logRepository.log({
      task: "item created",
      storeId,
      userId,
      targetId: itemId,
    });

    return itemId;
  }
}
