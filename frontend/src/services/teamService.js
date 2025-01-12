import fetch from "../auth/axiosInterceptor";
import { TEAM_SERVICE } from "../constants/apiConstant";

const TeamService = {
  getTeam(data) {
    return fetch({
      url: TEAM_SERVICE,
      method: "get",
      data,
    });
  },
};
export default TeamService;
