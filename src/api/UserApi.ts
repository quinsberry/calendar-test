import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';

export const UserApi = {
    getUsers({}): Promise<AxiosResponse<User[]>> {
        return axios.get<User[]>('./users.json');
    },
    addUser(data: { name: string, username?: string }): Promise<AxiosResponse<User>> {
        return axios.post<User>('./users.json', data); // test functionality
    },
    removeUser(data: { id: string }): Promise<AxiosResponse<void>> {
        return axios.post<void>('./users.json', data); // test functionality
    },
} as const;