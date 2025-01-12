import { Layout } from "antd";
import NavigationMenu from "../NavigationMenu";
import LogoutButton from "../LogoutButton";

const AppHeader = () => {
  const { Header } = Layout;

  return (
    <Header className="d-flex align-items-center">
      <div className="d-flex justify-content-center align-items-center mr-2">
        <img
          className="logo"
          src="/img/football_player.png"
          alt="Football Logo"
        />
      </div>
      <NavigationMenu />
      <LogoutButton />
    </Header>
  );
};

export default AppHeader;
