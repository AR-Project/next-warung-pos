import ProtectOnServer from "../_protection/ProtectOnServer";

type props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: props) {
  return (
    <ProtectOnServer type="loggedIn" callback="/profile">
      <>
        <div className="flex flex-row w-screen bg-blue-950 bg-opacity-70">
          <h1>Profile Page</h1>
        </div>
        {children}
      </>
    </ProtectOnServer>
  );
}
