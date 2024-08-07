import { inject, injectable } from "tsyringe";

import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import { type IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";
import type { IMenuItemsRepository } from "@/Domains/menuItem/IMenuItemRepository";

@injectable()
export default class GetMenuUseCase {
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

  async execute(payload: StoreId): Promise<CategoryWithItemChildren[]> {
    await this._storeRepository.verifyStoreId(payload);

    await this._logRepository.log({
      task: "fetched whole menu from a store",
      storeId: payload,
    });

    const categories = await this._menuCategoryRepository.getAllInfoByStoreId(
      payload
    );
    const categoryIds = categories.map((category) => category.id);
    const allItemsByCategoryIds: IMenuItemRow[] =
      await this._menuItemsRepository.getByCategoryIds(categoryIds);

    const result = categories.map((category) => ({
      ...category,
      children: allItemsByCategoryIds.filter(
        (item) => item.categoryId === category.id
      ),
    }));

    return result;
  }
}
