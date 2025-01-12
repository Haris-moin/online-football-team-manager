import fetch from "../auth/axiosInterceptor";
import { TEAM_SERVICE } from "../constants/apiConstant";

const TeamService = {
  getTeam() {
    return fetch({
      url: TEAM_SERVICE,
      method: "get",
    });
  },
};
export default TeamService;
