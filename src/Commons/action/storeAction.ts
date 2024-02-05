"use server";

import GetStoreInfoUseCase from "@/Application/use_case/stores/GetStoreInfoUseCase";
import container from "@/infrastructure/container";

type ActionResponse = {
  status: "success" | "fail";
  message?: any;
  data?: StoreInfo;
};

export async function getStoreInfo(storeId: string): Promise<ActionResponse> {
  console.log(storeId);

  try {
    const getStoreInfoUseCase = container.resolve(GetStoreInfoUseCase);

    const storeInfo = await getStoreInfoUseCase.execute(storeId);
    return { status: "success", data: storeInfo };
  } catch (error: any) {
    return { status: "fail", message: error.message };
  }
}
