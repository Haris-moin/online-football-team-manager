import { Button } from "antd";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/slices/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
