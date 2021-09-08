import React, { FunctionComponent } from 'react';
import { Layout, Menu, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

export const Navbar: FunctionComponent = () => {
    const router = useHistory();
    const { isAuth, user } = useTypedSelector(state => state.auth);
    const { logout } = useActions();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ? (
                        <>
                            <div style={{ color: 'white' }}>
                                {user?.username ?? 'USERNAME'}
                            </div>
                            <Menu theme="dark" mode="horizontal" selectable={false}>

                                <Menu.Item
                                    onClick={logout}
                                    key={1}
                                >
                                    Sign out
                                </Menu.Item>
                            </Menu>
                        </>
                    ) : (
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item
                                onClick={() => router.push(RoutePaths.LOGIN)}
                                key={1}
                            >
                                Login
                            </Menu.Item>
                        </Menu>
                    )
                }
            </Row>
        </Layout.Header>
    );
};
