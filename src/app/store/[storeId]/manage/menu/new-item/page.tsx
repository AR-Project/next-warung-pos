import { BackButton } from "@/presentation/component/BackButton";
import { fetchAvailableCategory, addItem } from "./action";
import FormSubmitButton from "../../../../../../presentation/component/Form/FormSubmitButton";
import FormAddItem from "./FormAddItem";
import { redirect } from "next/navigation";
import getActiveStoreFromSession from "@/presentation/utils/getActiveStoreFromSession";
import getAppSession from "@/presentation/utils/getAppSession";

function FailToLoad() {
  return (
    <>
      <h3>Fail to load</h3>
    </>
  );
}

export default async function Page() {
  const categories = await fetchAvailableCategory();

  return (
    <>
      <BackButton></BackButton>
      <h1>New Item Page</h1>
      {categories ? <FormAddItem categories={categories} /> : <FailToLoad />}
    </>
  );
}
