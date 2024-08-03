import { inject, injectable } from "tsyringe";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import AddMenuCategoryEntity from "@/Domains/menuCategory/entities/addMenuCategory";

type AddMenuCategoryUseCasePayload = IAddMenuCategory;

@injectable()
export default class AddMenuCategoryUseCase {
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

  async execute(payload: AddMenuCategoryUseCasePayload): Promise<CategoryId> {
    const { userId, storeId } = payload;
    await this._userRepository.verifyUserId(userId);
    await this._storeRepository.verifyStoreId(storeId);

    const categoryPayload = new AddMenuCategoryEntity(payload);

    // console.log(`USE_CASE: ${JSON.stringify(categoryPayload)}`);

    const categoryId = await this._menuCategoryRepository.addMenuCategory(
      categoryPayload
    );

    await this._logRepository.log({
      task: "category created",
      storeId,
      userId,
      targetId: categoryId,
    });

    return categoryId;
  }
}
