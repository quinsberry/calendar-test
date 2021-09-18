import { AppDispatch } from '../index';
import { authActions } from './actions';
import { PersistenceService, PersistenceValues } from '../../services/PersistenceService';
import { validateFirstElementInList } from '../../utils/type-guards';
import { isUser } from '../../models/User';
import { ApiService } from '../../services/ApiService';

export const authOperations = {
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setIsLoading());
            setTimeout(async () => {
                const response = await ApiService.user.getUsers({
                    prediction: (data) => validateFirstElementInList(data, user => isUser(user)),
                    data: {},
                });
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