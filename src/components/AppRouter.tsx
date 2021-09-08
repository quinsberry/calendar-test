import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes, RoutePaths } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const AppRouter = () => {
    const { isAuth } = useTypedSelector(state => state.auth);

    return isAuth ? (
        <Switch>
            {privateRoutes.map(route =>
                <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={route.path}
                />,
            )}
            <Redirect to={RoutePaths.EVENT}/>
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map(route =>
                <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={route.path}
                />,
            )}
            <Redirect to={RoutePaths.LOGIN}/>
        </Switch>
    );
};
