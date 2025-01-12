import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Button, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/slices/authSlice";
import { protectedRoutes } from "../configs/routesConfig";

const AppLayout = ({ children }) => {
  const { Header, Content } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = protectedRoutes.map((route, index) => ({
    key: index + 1,
    label: route.name,
    onClick: () => navigate(route.path),
  }));

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Layout>
      <Header className="d-flex align-items-center">
        <div className="d-flex justify-content-center align-items-center mr-3">
          <img
            className="logo"
            src="/img/football_player.png"
            alt="Football Logo"
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[...menuItems]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div className="h-100">{children}</div>
      </Content>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
