import axios, { AxiosResponse } from 'axios';

export class UserApi {
    static async getUsers(): Promise<AxiosResponse<unknown>> {
        return axios.get('./users.json');
    }
}