import React from 'react';
import { LoginPage } from '../pages/Login';
import { EventPage } from '../pages/Event';

export interface Route {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RoutePaths {
    LOGIN = '/login',
    EVENT = '/'
}

export const publicRoutes: Route[] = [
    { path: RoutePaths.LOGIN, exact: true, component: LoginPage },
];

export const privateRoutes: Route[] = [
    { path: RoutePaths.EVENT, exact: true, component: EventPage },
];