import { AppDispatch } from '../index';
import { authActions } from './actions';
import { UserApi } from '../../api/UserApi';
import { PersistenceService, PersistenceValues } from '../../services/PersistenceService';
import { assertType, validateFirstElementInList } from '../../utils/type-guards';
import { isUser, User } from '../../models/User';

export const authOperations = {
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setIsLoading());
            setTimeout(async () => {
                const response = await UserApi.getUsers();
                assertType<User[]>(response.data, _ => validateFirstElementInList(_, isUser));
                const mockUser = response.data.find(user => user.username === username && user.password === password);
                if (mockUser) {
                    PersistenceService.addValue(PersistenceValues.Auth, true);
                    PersistenceService.addValue(PersistenceValues.Username, mockUser.username);
                    dispatch(authActions.setUser(mockUser));
                    dispatch(authActions.setIsAuth(true));
                } else {
                    dispatch(authActions.setError('Invalid login or password'));
                }
            }, 1000);
        } catch (e) {
            dispatch(authActions.setError('An error has been occurred'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        PersistenceService.removeValue(PersistenceValues.Auth);
        PersistenceService.removeValue(PersistenceValues.Username);
        dispatch(authActions.setUser(null));
        dispatch(authActions.setIsAuth(false));
    },
};