import React from "react";

// Public Routes Screens
export const AUTH = React.lazy(() => import('../views/AuthViews/authentication'));
export const MY_TEAM = React.lazy(() => import('../views/AppViews/MyTeam'));
export const TRANSFER_LIST = React.lazy(() => import('../views/AppViews/TransferList'));