import fetch from "../auth/axiosInterceptor";
import { TRANSFER_SERVICE } from "../constants/apiConstant";

const TransferService = {
  toggleTransferPlayer(data) {
    return fetch({
      url: `${TRANSFER_SERVICE}/toggle-transfer`,
      method: "post",
      data,
    });
  },

  getTransferListedPlayers(query = {}) {
    const url = `${TRANSFER_SERVICE}/players?${new URLSearchParams(query).toString()}`;
    console.log('url: ', url);
    return fetch({
      url,
      method: "get",
    });
  },

  purchasePlayer(data) {
    return fetch({
      url: `${TRANSFER_SERVICE}/purchase`,
      method: "post",
      data,
    });
  },
};
export default TransferService;
