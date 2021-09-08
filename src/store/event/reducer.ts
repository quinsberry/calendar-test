import { EventActions } from './actions';
import { User } from '../../models/User';
import { Event } from '../../models/Event';

interface EventState {
    events: Event[],
    guests: User[],
}

const initialState: EventState = {
    events: [],
    guests: [],
};

export const eventReducer = (state = initialState, action: EventActions): EventState => {
    switch (action.type) {
        case 'EVENT::SET_GUESTS':
            return { ...state, guests: action.payload };
        case 'EVENT::SET_EVENTS':
            return { ...state, events: action.payload };
        default:
            return state;
    }
};