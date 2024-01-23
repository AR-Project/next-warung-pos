"use server";

import ChangeUserPassword from "@/Application/use_case/auth/ChangePasswordUseCase";
import container from "@/infrastructure/container";

export default async function useCase(payload: ChangeUserPasswordPayload) {
  try {
    const changeUserPasswordUseCase = container.resolve(ChangeUserPassword);
    await changeUserPasswordUseCase.execute(payload);
    return { status: "success" };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}
