import { AUTH, MY_TEAM, TRANSFER_LIST } from "../configs/componentConstants";

const ROUTES = {
    AUTH :{
        key:'auth',
        path:'/auth',
        component: AUTH,
    },
    MY_TEAM :{
        key:'auth',
        path:'/app/my-team',
        component: MY_TEAM,
    },
    TRANSFER_LIST :{
        key:'auth',
        path:'/app/transfer-list',
        component: TRANSFER_LIST,
    },
}

export default ROUTES