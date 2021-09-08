export interface User {
    username: string;
    password: string;
}

export const isUser = (entry: any): entry is User => {
    return entry != null
        && typeof entry === 'object'
        && typeof entry.username === 'string'
        && typeof entry.password === 'string';
};