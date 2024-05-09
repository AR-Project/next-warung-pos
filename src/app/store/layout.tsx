import ProtectOnServer from "@/app/_protection/ProtectOnServer";

type props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: props) {
  return (
    <ProtectOnServer type="loggedIn" callback="/">
      <>{children}</>
    </ProtectOnServer>
  );
}
