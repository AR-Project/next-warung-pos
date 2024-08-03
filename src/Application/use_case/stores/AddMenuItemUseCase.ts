import { inject, injectable } from "tsyringe";

import AddMenuCategoryEntity from "@/Domains/menuCategory/entities/addMenuCategory";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import type { IMenuItemsRepository } from "@/Domains/menuItem/IMenuItemRepository";

type IMenuItemUseCasePayload = IAddMenuItemPayload;

@injectable()
export default class AddMenuCategoryUseCase {
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
  }

  async execute(payload: AddMenuCategoryUseCasePayload): Promise<CategoryId> {
    const { ownerId, storeId } = payload;
    await this._userRepository.verifyUserId(ownerId);
    await this._storeRepository.verifyStoreId(storeId);

    const categoryPayload = new AddMenuCategoryEntity(payload);

    // console.log(`USE_CASE: ${JSON.stringify(categoryPayload)}`);

    const categoryId = await this._menuCategoryRepository.addMenuCategory(
      categoryPayload
    );

    await this._logRepository.log({
      task: "category created",
      storeId,
      userId: ownerId,
      targetId: categoryId,
    });

    return categoryId;
  }
}
