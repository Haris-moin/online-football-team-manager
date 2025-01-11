const appRoute = ({ component: Component, ...props }) => {
  return <Component {...props} />;
};

export default appRoute;
