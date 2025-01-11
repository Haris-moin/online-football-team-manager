import PropTypes from 'prop-types';
import { Layout } from "antd";

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <div className="h-100">{children}</div>
    </Layout>
  );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default AppLayout;
