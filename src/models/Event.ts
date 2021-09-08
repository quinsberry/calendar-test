export interface Event {
    author: string;
    guest: string;
    date: string;
    description: string;
}

export const isEvent = (entry: any): entry is Event => {
    return entry != null
        && typeof entry === 'object'
        && typeof entry.author === 'string'
        && typeof entry.guest === 'string'
        && typeof entry.date === 'string'
        && typeof entry.description === 'string';
};
