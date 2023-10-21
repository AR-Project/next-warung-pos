import ProtectOnServer from "../_protection/ProtectOnServer";

type props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: props) {
  return (
    <ProtectOnServer type="loggedOut">
      <section>{children}</section>;
    </ProtectOnServer>
  );
}
