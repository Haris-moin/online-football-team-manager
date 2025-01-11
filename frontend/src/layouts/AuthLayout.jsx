import PropTypes from 'prop-types';
const AuthLayout = ({children}) => {
    return <div className="h-100">{children}</div>;
  }

  AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthLayout