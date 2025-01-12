import PropTypes from "prop-types";
import { Layout } from "antd";
import AppHeader from "../components/AppHeader";

const AppLayout = ({ children }) => {
  const { Content } = Layout;

  return (
    <Layout>
      <AppHeader />
      <Content className="p-4">
        <div className="h-100">{children}</div>
      </Content>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
