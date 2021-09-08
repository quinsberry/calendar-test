import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { rules } from '../utils/rules';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { LoadingStatus } from '../store/types';

export const LoginForm: FunctionComponent = () => {
    const { error, loadingStatus } = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useActions();

    const submit = () => {
        login(username, password);
    };

    return (
        <Form
            onFinish={submit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
        >
            {error && <div style={{ color: 'red' }}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('This field is required')]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('This field is required')]}
            >
                <Input.Password
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={'password'}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loadingStatus === LoadingStatus.LOADING}>
                    Sign in
                </Button>
            </Form.Item>
        </Form>
    );
};
