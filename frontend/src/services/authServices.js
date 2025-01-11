import fetch from "../auth/axiosInterceptor";
import { AUTH_TOKEN } from "../constants/constants";
import { removeItemFromLocalStorage } from "../utils/utils";
import { AUTH_SERVICE } from "../constants/apiConstant";

const UserService = {
  userAuth(data) {
    return fetch({
      url: AUTH_SERVICE,
      method: "post",
      data,
    });
  },

  logout() {
    const keysToRemove = [AUTH_TOKEN];
    keysToRemove.forEach((k) => removeItemFromLocalStorage(k));
  },
};
export default UserService;
