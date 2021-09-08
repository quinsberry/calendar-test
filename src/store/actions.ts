import { authActions, authOperations } from './auth';
import { eventActions, eventOperations } from './event';

export const allActions = {
    ...authActions,
    ...eventActions,
};

export const allOperations = {
    ...authOperations,
    ...eventOperations,
};