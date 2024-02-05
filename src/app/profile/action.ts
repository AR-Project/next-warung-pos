"use server";

import GetStoresUseCase from "@/Application/use_case/stores/GetAllStoreUseCase";
import container from "@/infrastructure/container";

export async function getStoresByUserId(payload: string) {
  try {
    const getStoreUsecase = container.resolve(GetStoresUseCase);
    const stores = await getStoreUsecase.execute(payload);
    return stores;
  } catch (error: any) {
    return undefined;
  }
}
