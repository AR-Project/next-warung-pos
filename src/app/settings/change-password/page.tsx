import React from "react";

import ChangePasswordInput from "@/presentation/component/input/ChangePasswordInput";
import getAppSession from "@/presentation/utils/getAppSession";
import useCase from "./action";

export default async function ChangePassword() {
  const session = await getAppSession();
  return (
    <>
      <div>ChangePassword</div>
      <ChangePasswordInput
        userId={session ? session?.user.id : ""}
        changePasswordHandler={useCase}
      />
    </>
  );
}
