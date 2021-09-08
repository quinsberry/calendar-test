import { AuthActions } from './actions';
import { User } from '../../models/User';
import { LoadingStatus } from '../types';

interface AuthState {
    isAuth: boolean,
    error: string,
    user: User | null,
    loadingStatus: LoadingStatus,
}

const initialState: AuthState = {
    isAuth: false,
    error: '',
    user: null,
    loadingStatus: LoadingStatus.NEVER,
};

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'AUTH::SET_AUTH':
            return { ...state, isAuth: action.payload, loadingStatus: LoadingStatus.LOADED };
        case 'AUTH::SET_USER':
            return { ...state, user: action.payload, loadingStatus: LoadingStatus.LOADED };
        case 'AUTH::SET_ERROR':
            return { ...state, error: action.payload, loadingStatus: LoadingStatus.ERROR };
        case 'AUTH::SET_IS_LOADING':
            return { ...state, loadingStatus: LoadingStatus.LOADING };
        default:
            return state;
    }
};