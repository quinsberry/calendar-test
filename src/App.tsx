import React, { FunctionComponent, useEffect } from 'react';
import { Layout } from 'antd';
import { useActions } from './hooks/useActions';
import { PersistenceService, PersistenceValues } from './services/PersistenceService';
import './App.css';
import { Navbar } from './components/Navbar';
import { AppRouter } from './components/AppRouter';

export const App: FunctionComponent = () => {
    const { setUser, setIsAuth } = useActions();

    useEffect(() => {
        if (PersistenceService.getValue(PersistenceValues.Auth)) {
            const username = PersistenceService.getValue(PersistenceValues.Username) ?? '';
            setUser({ username, password: '123' });
            setIsAuth(true);
        }
    }, []);

    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
};
