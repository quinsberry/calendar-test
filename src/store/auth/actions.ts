import { User } from '../../models/User';
import { InferActions } from '../types';

export type AuthActions = InferActions<typeof authActions>;
export const authActions = {
    setUser: (user: User | null) => ({ type: 'AUTH::SET_USER', payload: user } as const),
    setIsAuth: (auth: boolean) => ({ type: 'AUTH::SET_AUTH', payload: auth } as const),
    setIsLoading: () => ({ type: 'AUTH::SET_IS_LOADING' } as const),
    setError: (payload: string) => ({ type: 'AUTH::SET_ERROR', payload } as const),
};
