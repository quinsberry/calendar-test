import { InferActions } from '../types';
import { User } from '../../models/User';
import { Event } from '../../models/Event';

export type EventActions = InferActions<typeof eventActions>;
export const eventActions = {
    setGuests: (payload: User[]) => ({ type: 'EVENT::SET_GUESTS', payload } as const),
    setEvents: (payload: Event[]) => ({ type: 'EVENT::SET_EVENTS', payload } as const),
};
