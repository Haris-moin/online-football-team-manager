import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { protectedRoutes } from "../../configs/routesConfig";


const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  const menuItems = protectedRoutes.map((route) => ({
    key: route.path,
    label: route.name,
    onClick: () => navigate(route.path),
  }));

  useEffect(() => {
    const currentKey = protectedRoutes.find(
      (route) => route.path === location.pathname
    )?.path;
    setSelectedKey(currentKey);
  }, [location.pathname]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={menuItems}
      style={{
        flex: 1,
        minWidth: 0,
      }}
    />
  );
};

export default NavigationMenu;
