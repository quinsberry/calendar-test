export type InferOneAction<T> = T extends (...args: any[]) => infer U ? U : never;
export type InferActions<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never;

export enum LoadingStatus {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
}