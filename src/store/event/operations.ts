import { AppDispatch } from '../index';
import { eventActions } from './actions';
import { validateFirstElementInList } from '../../utils/type-guards';
import { isUser } from '../../models/User';
import { Event } from '../../models/Event';
import { PersistenceService, PersistenceValues } from '../../services/PersistenceService';
import { ApiService } from '../../services/ApiService';

export const eventOperations = {
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await ApiService.user.getUsers({
                prediction: (data) => validateFirstElementInList(data, user => isUser(user)),
                data: {},
            });
            dispatch(eventActions.setGuests(response.data));
        } catch (e) {
            console.log(e);
        }
    },
    createEvent: (event: Event) => async (dispatch: AppDispatch) => {
        try {
            const events = PersistenceService.getValue(PersistenceValues.Events) ?? [];
            events.push(event);
            dispatch(eventActions.setEvents(events));
            PersistenceService.addValue(PersistenceValues.Events, events);
        } catch (e) {
            console.log(e);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = PersistenceService.getValue(PersistenceValues.Events) ?? [];
            const currentUserEvents = events.filter(ev => ev.author === username || ev.guest === username);
            dispatch(eventActions.setEvents(currentUserEvents));
        } catch (e) {
            console.log(e);
        }
    },

};