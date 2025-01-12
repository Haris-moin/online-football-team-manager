import { AUTH, MY_TEAM, TRANSFER_LIST } from "../configs/componentConstants";

const ROUTES = {
    AUTH :{
        name:'Auth',
        key:'auth',
        path:'/auth',
        component: AUTH,
    },
    MY_TEAM :{
        name:'My Team',
        key:'auth',
        path:'/app/my-team',
        component: MY_TEAM,
    },
    TRANSFER_LIST :{
        name:'Transfer List',
        key:'auth',
        path:'/app/transfer-list',
        component: TRANSFER_LIST,
    },
}

export default ROUTES