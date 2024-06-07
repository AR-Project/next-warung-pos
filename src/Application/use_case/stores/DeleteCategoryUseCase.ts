import { inject, injectable } from "tsyringe";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import AddMenuCategoryEntity from "@/Domains/menuCategory/entities/addMenuCategory";

type IDeleteUseCasePayload = {
  userId: UserId;
  categoryId: CategoryId;
  storeId: StoreId;
};

@injectable()
export default class DeleteMenuCategoryUseCase {
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

  async execute(payload: IDeleteUseCasePayload): Promise<void> {
    await this._menuCategoryRepository.deleteMenuCategory(payload.categoryId);

    const result =
      await this._menuCategoryRepository.getAllCategoriesIdsByStoreId(
        payload.storeId
      );

    const updateSortOrder = result.map((e, i) => ({ id: e, sortOrder: i }));

    await this._menuCategoryRepository.updateCategorySortOrder(updateSortOrder);

    await this._logRepository.log({
      task: "category Deleted",
      userId: payload.userId,
      targetId: payload.categoryId,
    });
  }
}
