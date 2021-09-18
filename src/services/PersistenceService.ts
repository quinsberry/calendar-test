import { assertType, validateFirstElementInList } from '../utils/type-guards';
import { Event, isEvent } from '../models/Event';

export enum PersistenceValues {
    Events = 'events',
    Username = 'username',
    Auth = 'auth',
}

type GetValue<Value extends PersistenceValues> =
    | Value extends PersistenceValues.Events ? Event[] | null :
    | Value extends PersistenceValues.Username ? string | null :
    | Value extends PersistenceValues.Auth ? boolean | null :
    never;

export class PersistenceService {
    static addValue<Value extends PersistenceValues>(value: Value, data: GetValue<Value>): void {
        window.localStorage.setItem(value, JSON.stringify(data));
    }

    static getValue<Value extends PersistenceValues>(value: Value): GetValue<Value> {
        switch (value) {
            case PersistenceValues.Auth: {
                const auth = this.getStorageValue(value);
                assertType<GetValue<Value>>(auth, _ => typeof auth === 'boolean' || auth == null);
                return auth;
            }
            case PersistenceValues.Username: {
                const username = this.getStorageValue(value);
                assertType<GetValue<Value>>(username, _ => typeof username === 'string' || username == null);
                return username;
            }
            case PersistenceValues.Events: {
                const events = this.getStorageValue(value);
                assertType<GetValue<Value>>(events, _ => _ == null || validateFirstElementInList(_, isEvent));
                return events;
            }
            default:
                throw new Error(`This code should not be reachable! Did not expect ${JSON.stringify(value, null, 4)}`);
        }
    }

    static removeValue(value: PersistenceValues): void {
        window.localStorage.removeItem(value);
    }

    private static getStorageValue(value: PersistenceValues) {
        const data = window.localStorage.getItem(value);
        return data ? JSON.parse(data) : null;
    }
}